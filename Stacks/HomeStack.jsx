import * as React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

//screens
import HomeScreen from "../Screens/HomeStack/HomeScreen"
import FilmScreen from "../Screens/HomeStack/FilmScreen"
import LogScreen from "../Screens/HomeStack/LogScreen"

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FilmScreen"
        component={FilmScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="LogScreen"
        component={LogScreen}
        options={{ title: "Log a Film" }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
