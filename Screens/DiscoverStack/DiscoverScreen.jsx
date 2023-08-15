import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
  ActivityIndicator,
} from "react-native"
import { useEffect, useLayoutEffect, useState } from "react"

import Colors from "../../Constants/Colors"

import Images from "../../Constants/Images"

import axios from "axios"

import { ENV_API_KEY } from "@env"

const DiscoverScreen = ({ navigation }) => {
  const [discovery, setDiscovery] = useState(null)
  const windowWidth = Dimensions.get("window").width
  const [numCols, setNumCols] = useState(3)
  const [fetchError, setFetchError] = useState(false)

  let apiQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${ENV_API_KEY}&with_genres=27`

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Discover new movies!",
      headerStyle: {
        backgroundColor: Colors.black,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    })
  }, [])

  useEffect(() => {
    console.log(apiQuery)
    try {
      axios
        .get(apiQuery)
        .then((res) => {
          setDiscovery(res.data.results)
        })
        .catch((err) => {
          setFetchError(true)
        })
    } catch (err) {
      alert(err.message)
      setFetchError(true)
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

  if (fetchError) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            flex: 1,
            backgroundColor: Colors.black,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Error fetching movies, please check you connection and if the problem
          persists contact the developer.
        </Text>
        <ActivityIndicator
          style={{ marginTop: 30 }}
          size="large"
          color={Colors.white}
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {discovery && (
        <FlatList
          data={discovery.slice(0, 18)}
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
    backgroundColor: Colors.black,
  },
  item: {
    textAlign: "center",
    aspectRatio: 1 / 1.5,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 1)",
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
