import { QuestionData } from "models/question.h"
import { database, auth } from "features/firebase"
import { useList } from "react-firebase-hooks/database"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import firebase from "firebase"

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
    answered
  }
}

// TODO: неплохо бы всё-таки заменить эту лапшу на рамду
const transformList = (
  user?: firebase.User,
  snapshots?: any[],
  userVotes?: Record<string, string>
): ReturnType<typeof splitter> => {
  if (!user || !snapshots || !userVotes) {
    return splitter([])
  }

  return splitter(snapshots
    .map(snapshot => {
      const { created, question, author, authorId, votes, published, answered } = snapshot.val()
      const id = snapshot.key

      return {
        id,
        created,
        question,
        author,
        votes,
        answered,
        published,
        userCanVote: userVotes[id] !== id && user.uid !== authorId
      }
    })
    .sort(sorter))
}

type QnaData = [
  list: ReturnType<typeof splitter>,
  initialLoading: boolean
]

export const useQnaList = (): QnaData => {
  const ref = "questions/" + process.env.QNA_SESSION_ID
  const questions = database().ref(ref)

  const [user, userLoading, userError] = useAuthState(auth())
  const [snapshots, snapshotsLoading, error] = useList(questions)
  const [userVotes, setVotes] = useState<Record<string, string>>()

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
    transformList(user, snapshots, userVotes),
    isLoading
  ]
}
