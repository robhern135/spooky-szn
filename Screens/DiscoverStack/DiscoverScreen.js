import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Dimensions,
  ImageBackground,
} from "react-native"
import { useEffect, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"

import Images from "../../Constants/Images"

import axios from "axios"

const DiscoverScreen = () => {
  const [discovery, setDiscovery] = useState(null)
  const windowWidth = Dimensions.get("window").width
  const [numCols, setNumCols] = useState(3)

  let apiQuery = `https://api.themoviedb.org/3/discover/movie?api_key=d23b3e7c328d7a2c34d8c68f7f9a40f8&with_genres=27`

  useEffect(() => {
    try {
      axios.get(apiQuery).then((res) => {
        setDiscovery(res.data.results)
      })
    } catch (err) {
      alert(err.message)
    }
  }, [])

  const Item = ({ item }) => {
    return (
      <View style={[styles.item, { width: windowWidth / numCols - 5 }]}>
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          source={{
            uri: `${Images.poster_base}${item.poster_path}`,
          }}
        ></ImageBackground>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {discovery && <Text>Discover new movies below!</Text>}
      {discovery && (
        <FlatList
          data={discovery}
          renderItem={Item}
          keyExtractor={(item) => item.id}
          style={styles.discoveryList}
          numColumns={numCols}
        />
      )}
    </SafeAreaView>
  )
}

export default DiscoverScreen

const styles = StyleSheet.create({
  discoveryList: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  item: {
    textAlign: "center",
    aspectRatio: 1 / 1.5,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(224, 224, 224, 0.7)",
    margin: 2,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
  },
  bannerImage: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    aspectRatio: 2 / 1.1,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 10,
    color: "white",
  },
})
