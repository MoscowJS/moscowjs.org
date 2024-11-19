import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useIsAdmin } from './useIsAdmin'
import { SessionContext } from '../sessionContext'
import { database, auth } from '../../firebase'

export const useAdminActions = (questionId: string) => {
  const sessionId = useContext(SessionContext)
  const sessionRef = 'questions/' + sessionId

  const [user] = useAuthState(auth())
  const isAdmin = useIsAdmin()

  const publish = async () => {
    if (!user || !isAdmin) {
      return Promise.resolve()
    }

    return database().ref(`${sessionRef}/${questionId}/published`).set(true)
  }

  const remove = async () => {
    if (!user || !isAdmin) {
      return Promise.resolve()
    }

    return database().ref(`${sessionRef}/${questionId}`).remove()
  }

  const setAnswered = async () => {
    if (!user || !isAdmin) {
      return Promise.resolve()
    }

    return database().ref(`${sessionRef}/${questionId}/answered`).set(true)
  }

  return { publish, remove, setAnswered }
}
