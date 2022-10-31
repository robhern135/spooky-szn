import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
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
  const [usersName, setUsersName] = useState()

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

    // movieRef
    //   .get()
    //   .then((doc) => {
    //     // setMovies(doc.data())
    //     console.log(doc.data())
    //     // setUsersName(doc.data().name)
    //     // console.log(currentUser.uid)
    //     // console.log(usersName)
    //     // setMovies(doc.data().movies)
    //   })
    //   .then(console.log(movies))
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
  calendar: {
    marginTop: StatusBar.currentHeight || 0,
  },
})

export default OctoberCalendar
