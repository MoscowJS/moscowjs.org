import { QuestionData } from "models/question.h"
import { database, auth } from "features/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { QuestionFormData } from "../questionForm"

export const useAdd = () => {
  const ref = "questions/" + process.env.QNA_SESSION_ID
  const questions = database().ref(ref)

  const [user] = useAuthState(auth())

  const add = async (question: QuestionFormData) => {
    if (!user) {
      return
    }

    const data: QuestionData = {
      question: question.question,
      authorId: user.uid,
      created: Date.now(),
      published: false,
      answered: false,
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
