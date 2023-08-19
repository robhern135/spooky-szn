import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
} from "react-native"

import { useState, useEffect } from "react"

import CalendarItem from "./CalendarItem"
// import Movies from "../../../Data/Movies"

import { auth, db } from "../../../Firebase/firebase"

import { handleGetYear } from "../../../Functions/functions"

const OctoberCalendar = ({ navigation, currentDate, route }) => {
  const { currentUser } = auth

  const [calCols, setCalCols] = useState(4)
  const [userId, setUserId] = useState(currentUser.uid)

  const [movies, setMovies] = useState([])

  useEffect(() => {
    // console.log(`userId = ${userId}`)
    setTimeout(() => getMoviesFromDB(), 150)
  }, [route])

  const [theYear, setTheYear] = useState(handleGetYear())
  useEffect(() => {
    setTimeout(() => getMoviesFromDB(), 150)
  }, [])

  const getMoviesFromDB = async () => {
    // console.log(`getting data from year ${theYear}`)
    const moviesRef = db
      .collection("users")
      .doc(userId)
      .collection("years")
      .doc(String(theYear))
      .collection("movies")
    const myArray = []
    const snapshot = await moviesRef.get()
    // console.log(`moviesRef: ${moviesRef}`)

    if (snapshot) {
      console.log("data exists!")
      snapshot.forEach((doc) => {
        let data = doc.data()
        myArray.push(data)
        myArray.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
        // console.log(doc.id, "=>", data)
        setMovies(myArray)
        setTimeout(() => {
          console.log(myArray)
        }, 2000)
      })
    } else {
      console.log("data does not exist!")
    }
  }

  return (
    <SafeAreaView style={styles.calendar}>
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
