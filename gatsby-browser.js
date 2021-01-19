const React = require("react")
const { GlobalLayout } = require("components/layout")
const { auth } = require("features/firebase")

exports.wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}

exports.onInitialClientRender = () => {
  auth.signInAnonymously()
}
