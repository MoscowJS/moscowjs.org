import { useEffect, useState } from "react"
import { v5, validate, version } from "uuid"

const nameSpace = "40e0db0c-54ad-417c-83e7-bef942244801"
const reValidateUUID = (uuid: string) => {
  if (validate(uuid) && version(uuid) === 5) {
    return uuid
  }

  return v5("user_id", nameSpace)
}

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const userId = reValidateUUID(localStorage.getItem("user_id") || "")
      localStorage.setItem("user_id", userId)
      setUserId(userId)
    } catch {
      setUserId(null)
    }
  }, [])

  return userId
}
