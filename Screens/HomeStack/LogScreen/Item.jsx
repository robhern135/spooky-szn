import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"

import { useState } from "react"

import { auth, db } from "../../../Firebase/firebase"

import Images from "../../../Constants/Images"

import { handleGetYear } from "../../../Functions/functions"

const Item = ({ item, navigation, date, movies }) => {
  const {
    item: { title, release_date, poster_path, id },
  } = item
  const { poster_base } = Images

  const poster_uri = `${poster_base}${poster_path}`

  //firebase
  const { currentUser } = auth
  const [userId, setUserId] = useState(currentUser.uid)

  const handleItemPress = () => {
    console.log("item pressed")

    const moviesRef = db.collection("users").doc(userId).collection("movies")
    const year = handleGetYear()
    db.collection("users")
      .doc(userId)
      .collection("years")
      .doc(String(year))
      .collection("movies")
      .doc(`${date}`)
      .set(
        {
          completed: true,
          filmId: id,
          film: title,
        },
        { merge: true }
      )
      .then(() => {
        console.log("added, going home")
        navigation.replace("HomeStack", {
          screen: "HomeScreen",
          refreshHome: "refreshHome",
        })
      })
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        // navigation.navigate("HomeStack", { screen: "HomeScreen" })
        handleItemPress()
      }
    >
      <View style={styles.itemContainer}>
        {poster_uri && (
          <Image source={{ uri: poster_uri }} style={styles.poster} />
        )}
        <View style={styles.info}>
          {title && (
            <Text style={styles.title}>
              {title.length > 15 ? `${title.substring(0, 15)}...` : title}
            </Text>
          )}
          {release_date && (
            <Text style={styles.year}>{release_date.substring(0, 4)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  flatList: { borderWidth: 2, borderColor: "white", width: "100%" },
  item: {
    width: "100%",
    height: 100,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  poster: {
    height: 98,
    width: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info: { marginLeft: 20 },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  year: {
    color: "white",
    fontSize: 13,
  },
})

export default Item
