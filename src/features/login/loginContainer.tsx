import React, { useEffect, useRef } from "react"
import { auth, getApp } from "features/firebase"
import * as fbui from "firebaseui"
import firebase from "firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "firebaseui/dist/firebaseui.css"

auth().languageCode = "ru"

const uiConfig = {
  signInSuccessUrl: process.env.SITE_URL, //This URL is used to return to that page when we got success response for phone authentication.
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      defaultCountry: "RU",
      whitelistedCountries: ["+7"],
    },
    fbui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: process.env.SITE_URL + "coc",
  autoUpgradeAnonymousUsers: true,
  callbacks: {
    signInFailure: function (error: any) {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
        return Promise.resolve()
      }

      const cred = error.credential
      let data: any
      let currentUser = auth().currentUser!
      // If using Firebase Realtime Database. The anonymous user data has to be
      // copied to the non-anonymous user.
      const app = firebase.app()
      // Save anonymous user data first.
      return app
        .database()
        .ref("users/" + currentUser.uid)
        .once("value")
        .then(function (snapshot) {
          data = snapshot.val()
          return firebase.auth().signInWithCredential(cred)
        })
        .then(function (user) {
          return app
            .database()
            .ref("users/" + user.user?.uid)
            .set(data)
        })
        .then(function () {
          // Delete anonymnous user.
          return currentUser.delete()
        })
        .then(function () {
          data = null
          window.location.assign(process.env.SITE_URL!)
        })
    },
  },
}

const LoginContainer = () => {
  const [user, userLoading] = useAuthState(auth())
  const authRef = useRef(null)
  const uiRef = useRef<fbui.auth.AuthUI>()

  useEffect(() => {
    if (!authRef.current) return

    uiRef.current = uiRef.current || new fbui.auth.AuthUI(auth())
    uiRef.current.start("#firebase-auth", uiConfig)

    return () => {
      uiRef.current?.delete()
    }
  }, [authRef.current, user])

  if (userLoading) {
    return <p>Загрузка...</p>
  }

  if (!user || user.isAnonymous) {
    return <div ref={authRef} id="firebase-auth" />
  }

  if (user) {
    return <p>Привет, {user.email}</p>
  }

  return <p>Что-то пошло не так</p>
}

export default LoginContainer
