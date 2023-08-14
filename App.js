import * as React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Ionicons } from "@expo/vector-icons"
//**Stacks */
import AuthStack from "./Stacks/AuthStack"
import HomeStack from "./Stacks/HomeStack"
import DiscoverStack from "./Stacks/DiscoverStack"

import Colors from "./Constants/Colors"

//**FIREBASE
import { db, auth } from "./Firebase/firebase"

import {
  useFonts,
  Roboto_300Light,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"

//navigation elements
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const TabNav = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveBackgroundColor: Colors.black,
          tabBarInactiveBackgroundColor: Colors.black,
          tabBarIcon: ({ focused }) => {
            let iconName
            let color = focused ? "white" : "white"

            if (route.name === "Main") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Discover") {
              iconName = focused ? "settings" : "settings-outline"
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={24} color={color} />
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen
          name="Main"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverStack}
          options={{
            headerShown: false,
            tabBarLabel: "Discover",
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeStack"
          component={TabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
