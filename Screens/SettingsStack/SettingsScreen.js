import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native"
import { useEffect, useLayoutEffect, useState, useCallback } from "react"

import Colors from "../../Constants/Colors"

import { auth, db } from "../../Firebase/firebase"

const SettingsScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width
  let user = auth.currentUser
  const [userDetails, setUserDetails] = useState(null)

  const getUserData = async () => {
    const userRef = db.collection("users").doc(user.uid)
    const myArray = []
    const snapshot = await userRef.get()

    if (snapshot) {
      console.log("data exists!")

      let data = snapshot.data()
      myArray.push(data)
      // console.log(doc.id, "=>", data)
      setUserDetails(myArray)
      // console.log(movies)

      setTimeout(() => {
        console.log(userDetails)
      }, 3000)
    } else {
      console.log("data does not exist!")
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Settings",
      headerStyle: {
        backgroundColor: Colors.black,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    })
  }, [])

  const DeleteAccountConfirm = () =>
    Alert.alert(
      "Delete my account",
      "Are you sure you would like to delete your account? This operation cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDeleteAccount() },
      ]
    )

  const handleDeleteAccount = () => {
    const userRef = db.collection("users").doc(user.uid)

    userRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted!")
        user
          .delete()
          .then(() => {
            navigation.replace("AuthStack", { screen: "Login" })
            console.log("account deleted!")
          })
          .catch((error) => {
            alert(error.message)
          })
      })
      .catch((error) => {
        console.error("Error removing document: ", error)
      })
  }
  const handleLogOut = () => {
    console.log("logging out")
    auth
      .signOut()
      .then(function () {
        navigation.replace("AuthStack", { screen: "Login" })
        console.log("logged out")
      })
      .catch((err) => alert(err.message))
  }

  if (userDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, { color: "white" }]}>Account Options</Text>
        {userDetails ? (
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.detailText, { color: "white" }]}>
              You are logged in as: {userDetails[0].name}
            </Text>
            <Text style={[styles.detailText, { color: "white" }]}>
              Your registered email address is: {userDetails[0].email}
            </Text>
            <Text style={[styles.detailText, { color: "white" }]}>
              {auth.currentUser.uid}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity onPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={DeleteAccountConfirm}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Delete my Account
          </Text>
        </TouchableOpacity>
        <View style={[styles.divider, { width: windowWidth - 80 }]}></View>
        <Text style={styles.header}>Credits</Text>
        {/* https://www.freepik.com/free-vector/flat-halloween-animated-ghost-collection_5415564.htm#query=ghost&position=0&from_view=keyword&track=sph */}
        <Text style={styles.detailText}>Ghost Image by Freepik</Text>
        <Text style={styles.detailText}>
          Logo created using Canva Logo Maker
        </Text>
        <Text style={styles.detailText}>
          Film details provided by themoviedb.org
        </Text>
        <View style={[styles.divider, { width: windowWidth - 80 }]}></View>

        <Text style={styles.header}>Information</Text>
        <Text style={styles.detailText}>
          App created by Rob Hern (findrob.co.uk).
        </Text>
        <Text style={styles.detailText}>
          This app was made for no profit by a horror film lover.
        </Text>
        <Text style={styles.detailText}>
          For any issues please contact rob directly on robertjhern@gmail.com
          and I will get back to you asap!
        </Text>
      </SafeAreaView>
    )
  } else {
    return (
      <View
        style={{
          backgroundColor: Colors.black,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
          Getting account info...
        </Text>
      </View>
    )
  }
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  header: { fontWeight: "bold", color: "white", paddingBottom: 10 },
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
    borderColor: "white",
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
  divider: {
    height: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  detailText: {
    textAlign: "center",
    color: "white",
    lineHeight: 17,
    marginBottom: 5,
    paddingHorizontal: 30,
  },
})
