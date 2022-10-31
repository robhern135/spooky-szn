import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native"

import Colors from "../../../Constants/Colors"
import Images from "../../../Constants/Images"

import Item from "./Item"

const RenderItem = ({ item, navigation, date, movies }) => {
  return (
    <Item
      navigation={navigation}
      date={date}
      style={styles.renderItem}
      item={item}
      movies={movies}
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  flatList: { borderWidth: 2, borderColor: "white", width: "100%" },
  item: {
    width: "100%",
    height: 100,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  poster: {
    height: 98,
    width: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info: { marginLeft: 20 },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  year: {
    color: "white",
    fontSize: 13,
  },
})

export default RenderItem
