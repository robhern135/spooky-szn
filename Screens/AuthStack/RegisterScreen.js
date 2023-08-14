import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect, useLayoutEffect } from "react"

import { auth, db } from "../../Firebase/firebase"
import { doc, setDoc } from "firebase/firestore"

import Colors from "../../Constants/Colors"

import { Feather } from "@expo/vector-icons"

import MoviesNewUser from "../../Data/Movies-newuser"
import { SafeAreaView } from "react-native-safe-area-context"

const RegisterScreen = ({ route, navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState(route.params.email)
  const [password, setPassword] = useState(route.params.password)
  const [hidePassword, setHidePassword] = useState(true)
  const [userId, setUserId] = useState("")

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log(`Registered with ${user.email}`)
        const userCreated = Date().toLocaleString()
        return db
          .collection("users")
          .doc(user.uid)
          .set({
            name,
            email,
            userCreated,
          })
          .then(setUpBlankMovies(user.uid))
      })
      .catch((err) => {
        alert(err.message)
        console.log(err.message)
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // headerStyle: {
      //   backgroundColor: Colors.black,
      // },
      // headerTintColor: "#fff",
      // headerTitleStyle: {
      //   fontWeight: "bold",
      // },
    })
  }, [])

  const setUpBlankMovies = (userId) => {
    try {
      console.log(`userId is ${userId}`)
      const userRef = db.collection("users").doc(userId)
      const movieRef = db.collection("users").doc(userId).collection("movies")

      userRef.set(
        {
          hasMoviesSetUp: true,
        },
        { merge: true }
      )

      let MoviesNewUserLength = 1

      MoviesNewUser.forEach((movie) => {
        movieRef.doc(`${MoviesNewUserLength}`).set(
          {
            date: movie.date,
            day: movie.day,
            completed: movie.completed,
            film: movie.film,
            filmId: movie.filmId,
          },
          { merge: true }
        )
        MoviesNewUserLength++
      })
    } catch (err) {
      alert(err.message)
      console.log(err.message)
    }
  }

  const handleLoginScreen = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container} behavior={"padding"}>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Register</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        ></TextInput>
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
            style={styles.eyeIcon}
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color={hidePassword ? Colors.black : Colors.primary}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button]}>
          <Text style={[styles.buttonText]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoginScreen}
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

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 10,
    marginVertical: 3,
    color: Colors.black,
  },
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
