import * as React from "react"
import { View, Text } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SettingsScreen from "../Screens/SettingsStack/SettingsScreen"

const Stack = createNativeStackNavigator()

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export default DiscoverStack
