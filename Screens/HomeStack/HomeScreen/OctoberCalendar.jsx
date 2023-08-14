import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native"

import { useState, useEffect } from "react"

import CalendarItem from "./CalendarItem"
// import Movies from "../../../Data/Movies"

import { auth, db } from "../../../Firebase/firebase"

const OctoberCalendar = ({ navigation, currentDate, route }) => {
  const { currentUser } = auth

  const [calCols, setCalCols] = useState(4)
  const [userId, setUserId] = useState(currentUser.uid)

  const [movies, setMovies] = useState([])

  useEffect(() => {
    console.log(`userId = ${userId}`)
    setTimeout(() => getMoviesFromDB(), 150)
  }, [route])

  const getMoviesFromDB = async () => {
    const moviesRef = db.collection("users").doc(userId).collection("movies")
    const myArray = []
    const snapshot = await moviesRef.get()

    if (snapshot) {
      console.log("data exists!")
      snapshot.forEach((doc) => {
        let data = doc.data()
        myArray.push(data)
        myArray.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
        // console.log(doc.id, "=>", data)
        setMovies(myArray)
        // console.log(movies)
      })
    } else {
      console.log("data does not exist!")
    }
  }

  return (
    <SafeAreaView style={styles.calendar}>
      {movies ? (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <CalendarItem
              navigation={navigation}
              calCols={calCols}
              movie={item}
              itemIndex={item.index}
              currentDate={currentDate}
              movies={movies}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={calCols}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    marginTop: StatusBar.currentHeight || 0,
  },
})

export default OctoberCalendar
