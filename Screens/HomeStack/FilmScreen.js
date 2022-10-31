import { StyleSheet, Text, View, ImageBackground } from "react-native"
import React from "react"

import FilmBanner from "./FilmScreen/FilmBanner"
import Genres from "./FilmScreen/Genres"
import { Colors } from "react-native/Libraries/NewAppScreen"
import FilmOverview from "./FilmScreen/FilmOverview"
import Runtime from "./FilmScreen/Runtime"

const FilmScreen = ({ route, navigation }) => {
  const {
    completed,
    watchedOn,
    filmDetails: {
      backdrop_path,
      genres,
      // homepage,
      // id,
      overview,
      // poster_path,
      // production_companies,
      release_date,
      runtime,
      // spoken_languages,
      tagline,
      title,
    },
  } = route.params
  return (
    <View style={styles.container}>
      <FilmBanner
        title={title}
        backdrop_path={backdrop_path}
        release_date={release_date}
      />
      <View style={[styles.filmInfo, { backgroundColor: Colors.black }]}>
        {completed && (
          <View style={styles.watchedOn}>
            <Text style={[styles.watchedText, { color: Colors.white }]}>
              You watched this movie on October {watchedOn} 2023
            </Text>
          </View>
        )}
        {genres && (
          <View style={styles.filmTopInfo}>
            <Genres genres={genres} />
          </View>
        )}
        {overview && <FilmOverview overview={overview} tagline={tagline} />}
        {runtime && <Runtime runtime={runtime} />}
      </View>
    </View>
  )
}

export default FilmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  filmInfo: {
    width: "100%",
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  watchedText: {
    fontSize: 15,
  },
  taglineText: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  bannerImage: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    aspectRatio: 2 / 1.1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
    marginBottom: 20,
    color: "white",
  },
  languagesTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
    marginBottom: 20,
    color: "white",
  },
  filmTopInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})
