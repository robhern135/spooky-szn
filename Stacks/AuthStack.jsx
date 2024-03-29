import * as React from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../Screens/AuthStack/LoginScreen"
import RegisterScreen from "../Screens/AuthStack/RegisterScreen"

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
