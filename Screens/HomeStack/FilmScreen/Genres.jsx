import { StyleSheet, Text, View } from "react-native"
import React from "react"

import Colors from "../../../Constants/Colors"

const Genres = ({ genres }) => {
  return (
    <View style={styles.genreRow}>
      {genres.map((genre) => (
        <View
          key={genre.id}
          style={[styles.genre, { backgroundColor: Colors.orange }]}
        >
          <Text style={[styles.genreText, { color: Colors.black }]}>
            {genre.name}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default Genres

const styles = StyleSheet.create({
  genreRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginVertical: 5,
  },

  genre: {
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    marginVertical: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  genreText: {
    fontSize: 15,
    lineHeight: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})
