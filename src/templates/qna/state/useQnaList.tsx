import { QuestionData } from "../../../models/question.h"
import { useUserId } from "../../../utils/hooks/useUserId"
import { useEffect, useState } from "react"

const updateList = (
  list: QuestionData[],
  updates: QuestionData[]
): QuestionData[] => {
  const result = new Map<string, QuestionData>(
    list.concat(updates).map(question => {
      return [question.id, question]
    })
  )

  return [...(result.values as any)]
}

export const useQnaList = (): [
  initialLoading: boolean,
  list: QuestionData[],
  actions: {
    upvote: (id: string) => Promise<void>
  }
] => {
  const backendUrl = process.env.MJS_BACKEND_API_URL
  const qnaSession = "mjso2"
  const userId = useUserId()
  const [list, saveList] = useState<QuestionData[]>([])
  const [initialLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      return
    }

    const controller = new AbortController()

    fetch(`${backendUrl}/qna/${qnaSession}`, {
      signal: controller.signal,
      headers: {
        user_id: userId,
        refresh: "refresh",
      },
    })
      .then(r => r.json())
      .then(saveList)
      .catch()
      .finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [userId])

  const actions = {
    upvote(questionId: string) {
      if (!userId) {
        return Promise.resolve()
      }

      return fetch(`${backendUrl}/qna/vote/${qnaSession}`, {
        method: "POST",
        headers: {
          user_id: userId,
        },
      })
        .then(r => r.json())
        .then(result => {
          saveList(updateList(list, [result]))
        })
        .catch()
    },
  }

  return [initialLoading, list, actions]
}
