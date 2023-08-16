import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect, useLayoutEffect } from "react"

import { auth } from "../../Firebase/firebase"

import Colors from "../../Constants/Colors"

import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "./Logo"
import { StatusBar } from "expo-status-bar"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hidePassword, setHidePassword] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeStack")
      }
    })
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log(`Logged in with ${user.email}`)
      })
      .catch((err) => alert(err.message))
  }
  const handleRegisterScreen = () => {
    navigation.navigate("Register", {
      email: email,
      password: password,
    })
  }

  return (
    <SafeAreaView style={styles.container} behavior={"padding"}>
      <StatusBar style="light" />
      <Logo />
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={hidePassword ? true : false}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { width: "100%" }]}
          ></TextInput>
          <Feather
            onPress={() => {
              setHidePassword(!hidePassword)
            }}
            style={[
              styles.eyeIcon,
              { bottom: Platform.OS === "ios" ? 10 : 15 },
            ]}
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color={hidePassword ? Colors.black : Colors.primary}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegisterScreen}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register for an Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingTop: 20,
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: { width: "80%" },
  eyeIcon: { position: "absolute", right: 15, bottom: 15 },
  input: {
    color: Colors.black,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 10,
    marginVertical: 3,
  },
  passwordContainer: { flexDirection: "row" },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: Colors.black,
    marginTop: 5,
    borderColor: Colors.black,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
  },
})

export default LoginScreen
