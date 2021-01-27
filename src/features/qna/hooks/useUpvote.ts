import { database, auth } from "features/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"

export const useUpvote = () => {
  const ref = "questions/" + process.env.QNA_SESSION_ID

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

  const upvote = async (id: string) => {
    if (!user || !userVotes || userVotes[id] === id) {
      return
    }

    // TODO: добавить проверку, что автор вопроса не голосует сам за себя
    // (на беке чекается, и кнопка не должна быть доступна, но всё же)
    const questionRef = database().ref(`${ref}/${id}`)

    database().ref(`users/${user.uid}/votes`).update({ [id]: id })

    return questionRef.transaction(question => {
      if (question) {
        question.votes = (question.votes || 0) + 1
      }

      return question
    })
  }

  return upvote
}
