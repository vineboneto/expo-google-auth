import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

// WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1061294397430-plh7m08rnor0ttcvuu661u0mpe2vkip8.apps.googleusercontent.com",
    androidClientId:
      "1061294397430-6g6bt0iu3n8fsjkje2u4tscuqs8bim21.apps.googleusercontent.com",
    ...(Constants.appOwnership !== "expo"
      ? { redirectUri: "com.temp://" }
      : {}),
  });

  useEffect(() => {
    async function handleSignGoogle() {
      try {
        if (
          response?.type === "success" &&
          response.authentication?.accessToken
        ) {
          const data = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.authentication.accessToken}`
          );
          const userInfo = await data.json();
          setUser({
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.given_name,
            photo: userInfo.picture,
          });
        }
      } catch (err) {
        setError(err.message);
      }
    }
    handleSignGoogle();
  }, [response]);

  return (
    <View style={styles.content}>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Testando app {process.env.EXPO_APP_NAME}</Text>
        {!!user?.name && (
          <Text style={styles.textWelcome}>Bem vindo, {user.name}</Text>
        )}
        {!!error && <Text style={styles.textWelcome}>{error}</Text>}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#421549" : "purple",
            },
            styles.button,
          ]}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={styles.buttonText}>Fazer Login com google</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ececec",
    height: 60,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    paddingHorizontal: 20,
  },
  debug: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  textWelcome: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
