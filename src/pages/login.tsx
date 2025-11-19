import React, { FunctionComponent, Suspense } from 'react'
import type { PageProps } from 'gatsby'

import { Container, Header, Footer } from '../components/layout'
import SEO from '../utils/seo'

const LoginContainer = React.lazy(
  () => import('../features/login/loginContainer')
)

const Page: FunctionComponent<PageProps> = ({ location }) => {
  return (
    <>
      <SEO title="Авторизация" />
      <Header location={location} />
      <Container as="main">
        {typeof window !== 'undefined' && (
          <Suspense fallback={<p>Загрузка...</p>}>
            <LoginContainer />
          </Suspense>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Page
