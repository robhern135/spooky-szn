import { StyleSheet, Text, View } from "react-native"
import React from "react"

const FilmOverview = ({ overview, tagline }) => {
  return (
    <View style={styles.overviewContainer}>
      <View style={styles.overviewInner}>
        {tagline ? (
          <Text style={styles.overviewTitle}>{tagline}</Text>
        ) : (
          <Text style={styles.overviewTitle}>Overview:</Text>
        )}
        <Text style={styles.overview}>{overview}</Text>
      </View>
    </View>
  )
}

export default FilmOverview

const styles = StyleSheet.create({
  overviewContainer: {},
  overviewInner: {},
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    marginTop: 20,
  },
  overview: { marginBottom: 20, fontSize: 15, lineHeight: 18, color: "white" },
})
