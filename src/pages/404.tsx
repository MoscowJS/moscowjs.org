import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit"
import { PageProps } from "gatsby"

const NotFoundPage: FunctionComponent<PageProps> = ({ location }) => (
  <Layout>
    <SEO title="404: Not found" />
    <Header location={location} />
    <Layout.Container>
      <h1>404: Not Found</h1>
      <p>Кажется, такой страницы не существует ¯\_(ツ)_/¯ </p>
    </Layout.Container>
    <Footer />
  </Layout>
)

export default NotFoundPage
