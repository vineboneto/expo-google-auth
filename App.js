import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'

export default function App() {
  const [user, setUser] = useState({})
  const [error, setError] = useState('')

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: String(process.env.EXPO_ID),
    androidClientId: String(process.env.EXPO_ANDROID_ID),
    redirectUri:
      Constants.appOwnership === 'expo'
        ? String(process.env.EXPO_REDIRECT_URI)
        : String(process.env.EXPO_REDIRECT_URI_PROD),
  })

  useEffect(() => {
    async function signInWithGoogle() {
      try {
        if (response?.type === 'success' && response?.authentication?.accessToken) {
          const baseUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'
          const dataFetch = await fetch(`${baseUrl}?alt=json&access_token=${response.authentication.accessToken}`)
          const userInfo = await dataFetch.json()
          setUser({
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.given_name,
            photo: userInfo.picture,
          })
        }
      } catch (err) {
        setError(err.message)
      }
    }
    signInWithGoogle()
  }, [response])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{process.env.EXPO_APP_NAME}</Text>
      {!!user?.name && <Text style={styles.textWelcome}>Bem vindo, {user?.name}</Text>}
      <Text style={styles.debug}>error: {error}</Text>
      <Text style={styles.debug}>RedirectUrl: {request?.redirectUri}</Text>
      <Text style={styles.debug}>AccessToken: {response?.authentication?.accessToken}</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#421549' : 'purple',
          },
          styles.button,
        ]}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Fazer Login com google</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ececec',
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    paddingHorizontal: 20,
  },
  debug: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  textWelcome: {
    fontSize: 40,
    fontWeight: 'bold',
  },
})
