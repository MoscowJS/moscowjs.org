const React = require("react")
const { GlobalLayout } = require("./src/components/layout/globalLayout")

exports.wrapPageElement = ({ element, props }) => {
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}
