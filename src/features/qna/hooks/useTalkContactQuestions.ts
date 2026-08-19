import { useContext } from 'react'
import { useList } from 'react-firebase-hooks/database'

import { QuestionData } from '../../../models'
import { database } from '../../firebase'
import { SessionContext } from '../sessionContext'

const sorter = (a: QuestionData, b: QuestionData) => {
  const byVotes = (b.votes || 0) - (a.votes || 0)
  if (byVotes !== 0) return byVotes
  return (b.created || 0) - (a.created || 0)
}

export const useTalkContactQuestions = (
  talkKey: string
): [QuestionData[], boolean] => {
  const sessionId = useContext(SessionContext)
  const ref = database().ref('questions/' + (sessionId || '__none__'))
  const [snapshots, loading] = useList(ref)

  if (!sessionId) {
    return [[], false]
  }

  const questions = (snapshots || [])
    .map(snapshot => {
      const val = snapshot.val() as QuestionData
      return { ...val, id: snapshot.key ?? undefined }
    })
    .filter(q => q.talk === talkKey && q.hasContacts && q.published)
    .sort(sorter)

  return [questions, loading]
}
