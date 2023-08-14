import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { useState } from "react"

import Colors from "../../Constants/Colors"

import OctoberCalendar from "./HomeScreen/OctoberCalendar"

const HomeScreen = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date().getDate())

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <OctoberCalendar navigation={navigation} currentDate={currentDate} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
})
