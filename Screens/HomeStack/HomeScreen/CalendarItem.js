import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"

import Images from "../../../Constants/Images"

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

//https://api.themoviedb.org/3/movie/4232?api_key=d23b3e7c328d7a2c34d8c68f7f9a40f8&language=en-US

const CalendarItem = ({
  movie,
  calCols,
  navigation,
  currentDate,
  itemIndex,
  movies,
}) => {
  const [filmDetails, setFilmDetails] = useState()

  const { date, film, completed, day, filmId } = movie
  useEffect(() => {
    if (completed) {
      getFilmDetails()
    }
  }, [])

  const getFilmDetails = () => {
    let apiQuery = `https://api.themoviedb.org/3/movie/${filmId}?api_key=d23b3e7c328d7a2c34d8c68f7f9a40f8&language=en-US`

    axios.get(apiQuery).then((res) => {
      setFilmDetails(res.data)
    })
  }

  const handleFilmPress = () => {
    if (completed && filmDetails) {
      openFilmPage()
    } else {
      //film not logged but add one
      console.log("not completed but available")
      openLogPage()
    }
  }

  const openFilmPage = () => {
    //film logged, view details
    navigation.push("FilmScreen", {
      filmDetails: filmDetails,
      name: filmDetails.title,
      watchedOn: date,
      completed: completed,
      itemIndex: itemIndex,
    })
    navigation.setOptions({ name: filmDetails.title })
  }

  const openLogPage = () => {
    navigation.push("LogScreen", {
      date: date,
      completed: completed,
      movies: movies,
    })
  }

  return (
    <View style={[styles.calendarItem, { width: windowWidth / calCols - 4 }]}>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          disabled={date <= currentDate ? false : true}
          style={styles.dateContainer}
          onPress={() => handleFilmPress()}
        >
          {completed && filmDetails ? (
            <ImageBackground
              resizeMode="cover"
              style={styles.backgroundImage}
              source={{
                uri: `${Images.poster_base}${filmDetails.poster_path}`,
              }}
            >
              <View style={styles.calendarContent}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.date}>{date}</Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.dateContainer}>
              <Text>{day}</Text>
              <Text>{date}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calendarItem: {
    textAlign: "center",
    aspectRatio: 1 / 1.5,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(224, 224, 224, 0.7)",
    margin: 2,
    height: "100%",
  },
  dateContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  calendarContent: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(9, 11, 6, .6)",
  },
  day: {
    color: "white",
    fontSize: 24,
  },
  date: {
    color: "white",
    fontSize: 24,
  },
})

export default CalendarItem
