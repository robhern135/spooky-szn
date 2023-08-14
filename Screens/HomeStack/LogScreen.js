import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native"
import { useLayoutEffect, useState } from "react"

import axios from "axios"

import Colors from "../../Constants/Colors"
import SearchResults from "./LogScreen/SearchResults"

const LogScreen = ({ route, navigation }) => {
  const { date, completed, itemIndex, movies } = route.params

  const [text, setText] = useState()
  const [searchQuery, setSearchQuery] = useState(null)
  const [errorText, setErrorText] = useState()
  const [searchResults, setSearchResults] = useState(null)

  const windowHeight = Dimensions.get("window").height
  const windowWidth = Dimensions.get("window").width

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Log a movie",
      headerStyle: {
        backgroundColor: Colors.black,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    })
  }, [])

  const handleTextChange = (text) => {
    setText(text)
    if (text.length >= 3) {
      setSearchQuery(text)
      setErrorText(null)
      searchForFilms()
    } else {
      if (text.length == 0) {
        setSearchQuery(null)
        setErrorText(null)
      } else {
        setSearchQuery(null)
        setErrorText("Please keep typing to search")
      }
    }
  }

  const searchForFilms = () => {
    const API_Search = `https://api.themoviedb.org/3/search/movie?api_key=d23b3e7c328d7a2c34d8c68f7f9a40f8&language=en-US&query=${searchQuery}&page=1&include_adult=false`

    axios.get(API_Search).then((res) => {
      setSearchResults(res.data.results)
    })
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors.black, height: windowHeight },
      ]}
    >
      <Text style={styles.filmText}>
        What film did you watch on October {date}?
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Start typing to search"
          style={[styles.input, { color: Colors.black }]}
          onChangeText={(text) => handleTextChange(text)}
          value={text}
        />
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
      {searchResults && (
        <SearchResults
          navigation={navigation}
          searchResults={searchResults}
          query={searchQuery}
          date={date}
          movies={movies}
        />
      )}
    </SafeAreaView>
  )
}

export default LogScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
  },
  filmText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
})
