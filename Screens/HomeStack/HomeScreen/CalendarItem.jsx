import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"

import Images from "../../../Constants/Images"
import { ENV_API_KEY } from "@env"

const windowWidth = Dimensions.get("window").width

//https://api.themoviedb.org/3/movie/4232?api_key=KEY&language=en-US

const CalendarItem = ({
  movie,
  calCols,
  navigation,
  currentDate,
  itemIndex,
  movies,
}) => {
  const [filmDetails, setFilmDetails] = useState()
  const [fetchError, setFetchError] = useState(false)

  const { date, film, completed, day, filmId } = movie
  useEffect(() => {
    if (completed) {
      getFilmDetails()
    }
  }, [])

  const getFilmDetails = () => {
    try {
      let apiQuery = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${ENV_API_KEY}&language=en-US`
      console.log(apiQuery)
      axios
        .get(apiQuery)
        .then((res) => {
          setFilmDetails(res.data)
        })
        .catch(() => {
          setFetchError(true)
        })
    } catch (err) {
      setFetchError(true)
    }
  }

  const handleFilmPress = () => {
    if (completed && filmDetails && !fetchError) {
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

  const handleTooSoon = () =>
    Alert.alert(
      "Hold your horses!",
      `Wait until ${day} ${date}/10 to log this film`,
      [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    )

  return (
    <View style={[styles.calendarItem, { width: windowWidth / calCols - 4 }]}>
      <View style={styles.dateContainer}>
        {fetchError ? (
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ textAlign: "center" }}>
              Error Fetching Movie Details
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            // disabled={date <= currentDate ? false : true}
            style={styles.dateContainer}
            onPress={() =>
              date <= currentDate ? handleFilmPress() : handleTooSoon()
            }
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
        )}
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
