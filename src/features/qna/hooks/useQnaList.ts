import { QuestionData } from "models/question.h"
import { database, auth } from 'features/firebase'
import { useList } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from "react";
import { QuestionFormData } from "../questionForm";
import firebase from 'firebase'

const ref = 'questions/' + process.env.QNA_SESSION_ID
const questions = database.ref(ref)
const sorter = (questionA: QuestionData, questionB: QuestionData) => {
  const n = (questionB.votes || 0) - (questionA.votes || 0)

  if (n !== 0) {
    return n
  }

  return (questionB.created || 0) - (questionA.created || 0)
}

const transformList = (user?: firebase.User, snapshots?: any[], userVotes?: Record<string, string>): QuestionData[] => {
  if (!user || !snapshots || !userVotes) {
    return []
  }
  
  return snapshots.map(snapshot => {
    const { created, question, author, authorId, votes } = snapshot.val()
    const id = snapshot.key

    return {
      id,
      created,
      question,
      author,
      votes,
      userCanVote: userVotes[id] !== id && user.uid !== authorId,
      userCanEdit: user.uid === authorId
    }
  }).sort(sorter)
}

export const useQnaList = (): [
  list: QuestionData[],
  initialLoading: boolean,
  actions: {
    add: (question: QuestionFormData) => Promise<any>
    upvote: (id: string) => Promise<any>
  }
] => {
  const [user, userLoading, userError] = useAuthState(auth)
  const [snapshots, snapshotsLoading, error] = useList(questions)
  const [userVotes, setVotes] = useState<Record<string, string>>()

  useEffect(() => {
    if (!user) {
      return
    }

    const votesRef = database.ref(`users/${user.uid}/votes`)
    const onUpdate = (result: any) => {
      setVotes(result.val() || {})
    }
    votesRef.on('value', onUpdate)
    
    return () => votesRef.off('value', onUpdate)
  }, [user])

  const add = async (question: QuestionFormData) => {
    if (!user) {
      return
    }

    const data: QuestionData = {
      question: question.question,
      authorId: user.uid,
      created: Date.now(),
      votes: 0
    }

    return Promise.all([
      questions.push().set(data),
      database.ref(`users/${user.uid}`).update({
        name: question.author,
        contacts: question.contacts
      })
    ])
  }

  const upvote = async (id: string) => {
    if (!user || !userVotes) {
      return
    }

    const questionRef = database.ref(`${ref}/${id}`)

    if (userVotes[id] === id) {
      return
    }

    database.ref(`users/${user.uid}/votes`).update({ [id]: id })

    return questionRef.transaction(question => {
      if (question) {
        question.votes = (question.votes || 0) + 1
      }

      return question
    })
  }

  const isLoading = snapshotsLoading || userLoading || !userVotes

  return [transformList(user, snapshots, userVotes), isLoading, {
    add,
    upvote
  }]
}
