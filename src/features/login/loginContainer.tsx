import React, { useEffect, useRef } from 'react'
import { auth } from 'features/firebase'
import * as fbui from 'firebaseui'
import firebase from 'firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import 'firebaseui/dist/firebaseui.css'

auth().languageCode = 'ru';

const uiConfig = {
  signInSuccessUrl: process.env.SITE_URL, //This URL is used to return to that page when we got success response for phone authentication.
  signInOptions: [{
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    defaultCountry: 'RU',
    whitelistedCountries: ['+7']
  }],
  tosUrl: process.env.SITE_URL + 'coc'
};

const LoginContainer = () => {
  const [user, userLoading] = useAuthState(auth())
  const authRef = useRef(null)
  const uiRef = useRef<fbui.auth.AuthUI>()

  useEffect(() => {
    if (!authRef.current) return

    uiRef.current = uiRef.current || new fbui.auth.AuthUI(auth())
    uiRef.current.start('#firebase-auth', uiConfig)

    return () => {
      uiRef.current?.delete()
    }

  }, [authRef.current, user])

  if (userLoading) {
    return <p>Загрузка...</p>
  }

  if (user) {
    return <p>Привет, {user.phoneNumber}</p>
  }

  return <div ref={authRef} id="firebase-auth" />
}

export default LoginContainer
