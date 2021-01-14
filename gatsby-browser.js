const { v5, validate, version } = require("uuid")

const nameSpace = "40e0db0c-54ad-417c-83e7-bef942244801"
const setupUserId = () => {
  try {
    const storedUserId = localStorage.getItem("user_id")

    if (validate(storedUserId) && version(storedUserId) === 5) {
      return
    }

    localStorage.setItem("user_id", v5("user_id", nameSpace))
  } catch (error) {
    console.trace(error)
  }
}

exports.onClientEntry = () => {
  setupUserId()
}
