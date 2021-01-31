import { database, auth } from "features/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useContext, useEffect, useState } from "react"
import { SessionContext } from ".."

export const useUpvote = () => {
  const sessionId = useContext(SessionContext)
  const sessionRef = "questions/" + sessionId

  const [user] = useAuthState(auth())
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

  const upvote = async (questionId: string) => {
    if (!user || !userVotes || userVotes[questionId] === questionId) {
      return
    }

    // TODO: добавить проверку, что автор вопроса не голосует сам за себя
    // (на беке чекается, и кнопка не должна быть доступна, но всё же)
    database()
      .ref(`users/${user.uid}/votes`)
      .update({ [questionId]: questionId })

    return database()
      .ref(`${sessionRef}/${questionId}/votes`)
      .transaction(votes => {
        return (votes || 0) + 1
      })
  }

  return upvote
}
