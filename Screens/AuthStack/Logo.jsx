import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import React from "react"

import Colors from "../../Constants/Colors"

const Logo = () => {
  const windowWidth = Dimensions.get("window").width
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={{
        backgroundColor: "white",
        resizeMode: "contain",
        marginHorizontal: 40,
        width: windowWidth - 80,
        height: ((windowWidth - 80) / 5) * 3,
        backgroundColor: Colors.black,
        marginBottom: 30,
      }}
    />
  )
}

export default Logo

const styles = StyleSheet.create({})
