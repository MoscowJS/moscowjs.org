const React = require("react")
const { GlobalLayout } = require("components/layout")

exports.wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}

// exports.onInitialClientRender = () => {
//   loadFirebase().then(app => app.auth().signInAnonymously())
// }
