import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import type { QuestionData } from '../../../models'
import { database, auth } from '../../firebase'
import { QuestionFormData } from '../questionForm'
import { SessionContext } from '../sessionContext'

export const useAdd = () => {
  const sessionId = useContext(SessionContext)
  const ref = 'questions/' + sessionId
  const questions = database().ref(ref)

  const [user, userLoading] = useAuthState(auth())

  useEffect(() => {
    if (userLoading || user) return
    auth()
      .signInAnonymously()
      .catch(err => {
        console.error('[qna] anonymous sign-in failed', err)
      })
  }, [user, userLoading])

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
