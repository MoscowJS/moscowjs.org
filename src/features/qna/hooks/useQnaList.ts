import { QuestionData } from "models/question.h"
import { database, auth } from "features/firebase"
import { useList } from "react-firebase-hooks/database"
import { useAuthState } from "react-firebase-hooks/auth"
import { useContext, useEffect, useState } from "react"
import firebase from "firebase"
import { useIsAdmin } from "./useIsAdmin"
import { SessionContext } from ".."

type Talk = {
  title: string
  speaker: string
  timeEnd: number
}
const allTalks: Talk[] = [
  {
    title: "Единый стиль кода: как и зачем",
    speaker: "Софья Гусева",
    timeEnd: 1680798600000,
  },
  {
    title: "Зачем и когда стоит использовать Deno",
    speaker: "Данильян Ахмедьзянов",
    timeEnd: 1680800100000,
  },
  {
    title: "Сравнение подходов разработки: implementation-first vs contract-first",
    speaker: "Паша Коршиков",
    timeEnd: 1680803100000,
  },
  {
    title: "TypeScript: тип never и исчерпывающая проверка типа",
    speaker: "Денис Чиж",
    timeEnd: 1680805800000,
  },
]

const sorter = (questionA: QuestionData, questionB: QuestionData) => {
  const n = (questionB.votes || 0) - (questionA.votes || 0)

  if (n !== 0) {
    return n
  }

  return (questionB.created || 0) - (questionA.created || 0)
}

const splitter = (questions: QuestionData[]) => {
  const unpublished: QuestionData[] = []
  const published: QuestionData[] = []
  const answered: QuestionData[] = []

  questions.forEach(question => {
    if (!question.published) {
      unpublished.push(question)
      return
    }

    if (question.answered) {
      answered.push(question)
      return
    }

    published.push(question)
  })

  return {
    unpublished,
    published,
    answered,
  }
}

// TODO: неплохо бы всё-таки заменить эту лапшу на рамду
const transformList = (
  isAdmin: boolean,
  user?: firebase.User | null,
  snapshots?: any[],
  userVotes?: Record<string, string>
): ReturnType<typeof splitter> => {
  if (!user || !snapshots || !userVotes) {
    return splitter([])
  }

  const result = splitter(
    snapshots
      .map(snapshot => {
        const {
          created,
          question,
          author,
          authorId,
          votes,
          published,
          answered,
          talk,
        } = snapshot.val()
        const id = snapshot.key

        return {
          id,
          created,
          question,
          author,
          authorId,
          votes,
          talk,
          answered,
          published,
          userCanVote:
            published &&
            !answered &&
            userVotes[id] !== id &&
            user.uid !== authorId,
        }
      })
      .sort(sorter)
  )

  if (!isAdmin) {
    result.unpublished = result.unpublished.filter(
      question => question.authorId === user.uid
    )
  }

  return result
}

type QnaData = [
  list: ReturnType<typeof splitter>,
  talks: typeof allTalks,
  initialLoading: boolean
]

export const useQnaList = (): QnaData => {
  const sessionId = useContext(SessionContext)
  const sessionRef = "questions/" + sessionId
  const questions = database().ref(sessionRef)

  const [user, userLoading, userError] = useAuthState(auth())
  const [snapshots, snapshotsLoading, error] = useList(questions)
  const [userVotes, setVotes] = useState<Record<string, string>>()
  const isAdmin = useIsAdmin()

  useEffect(() => {
    if (!user) {
      return
    }

    const votesRef = database().ref(`users/${user.uid}/votes`)
    const onUpdate = (result: any) => {
      setVotes(result.val() || {})
    }
    votesRef.on("value", onUpdate)

    return () => votesRef.off("value", onUpdate)
  }, [user])

  const isLoading = snapshotsLoading || userLoading

  return [
    transformList(isAdmin, user, snapshots, userVotes),
    allTalks,
    isLoading,
  ]
}
