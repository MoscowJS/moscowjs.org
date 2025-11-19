import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, database } from '../../firebase'

export const useIsAdmin = () => {
  const [user] = useAuthState(auth())
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }

    setIsAdmin(false)
    database()
      .ref(`admins/${user.uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          setIsAdmin(true)
        }
      })
      .catch()
  }, [user])

  return isAdmin
}
