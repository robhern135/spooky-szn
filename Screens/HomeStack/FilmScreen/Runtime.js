import { StyleSheet, Text, View } from "react-native"
import React from "react"

const Runtime = ({ runtime }) => {
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    let hoursText = ""
    if (hours > 1) {
      hoursText = "hrs"
    } else {
      hoursText = "hr"
    }
    // padToTwoDigits() to pad 8 to 08 etc
    return `${hours}${hoursText} ${minutes} mins`
  }
  const padToTwoDigits = (num) => {
    return num.toString().padStart(2, "0")
  }

  return (
    <View style={styles.runtime}>
      <Text
        style={[styles.detailsText, { fontWeight: "bold", marginRight: 10 }]}
      >
        Runtime:
      </Text>
      <Text style={styles.detailsText}>{toHoursAndMinutes(runtime)}</Text>
    </View>
  )
}

export default Runtime

const styles = StyleSheet.create({
  runtime: { flexDirection: "row" },
  detailsText: {
    color: "white",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
})
