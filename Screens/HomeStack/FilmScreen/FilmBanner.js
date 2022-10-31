import { StyleSheet, Text, ImageBackground } from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import Images from "../../../Constants/Images"

const FilmBanner = ({ title, backdrop_path, release_date }) => {
  return (
    <ImageBackground
      style={[styles.bannerImage]}
      source={{ uri: `${Images.poster_base}${backdrop_path}` }}
    >
      <LinearGradient
        style={styles.bannerImage}
        colors={["rgba(0, 0,0, 0)", "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 1)"]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.releaseDate}>{release_date.substring(0, 4)}</Text>
      </LinearGradient>
    </ImageBackground>
  )
}

export default FilmBanner

const styles = StyleSheet.create({
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
    marginBottom: 0,
    color: "white",
  },
  releaseDate: {
    fontSize: 15,
    marginRight: 20,
    marginBottom: 20,
    color: "white",
  },
})
