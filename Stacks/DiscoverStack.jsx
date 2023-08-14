import * as React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import DiscoverScreen from "../Screens/DiscoverStack/DiscoverScreen"

const Stack = createNativeStackNavigator()

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
    </Stack.Navigator>
  )
}

export default DiscoverStack
