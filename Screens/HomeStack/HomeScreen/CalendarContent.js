import { StyleSheet, Text, View } from "react-native"
import React from "react"

const CalendarContent = ({ date, day }) => {
  return (
    <View style={styles.calendarContent}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default CalendarContent

const styles = StyleSheet.create({
  calendarContent: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(9, 11, 6, .6)",
  },
  day: {
    color: "white",
    fontSize: 24,
  },
  date: {
    color: "white",
    fontSize: 24,
  },
})
