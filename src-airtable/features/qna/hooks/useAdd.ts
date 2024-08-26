import { QuestionData } from "models/question.h"
import { database, auth } from "features/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { QuestionFormData } from "../questionForm"
import { useContext } from "react"
import { SessionContext } from "../sessionContext"

export const useAdd = () => {
  const sessionId = useContext(SessionContext)
  const ref = "questions/" + sessionId
  const questions = database().ref(ref)

  const [user] = useAuthState(auth())

  const add = async (question: QuestionFormData) => {
    if (!user) {
      return
    }

    const data: QuestionData = {
      question: question.question,
      author: question.author,
      authorId: user.uid,
      created: Date.now(),
      published: false,
      answered: false,
      talk: question.talk,
    }

    return Promise.all([
      questions.push().set(data),
      database().ref(`users/${user.uid}`).update({
        name: question.author,
        contacts: question.contacts,
      }),
    ])
  }

  return !user ? null : add
}
