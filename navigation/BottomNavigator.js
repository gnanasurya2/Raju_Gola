import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import WebinarScreen from "../Screens/WebinarScreen";
import LeaderboardScreen from "../Screens/LeaderboardScreen";
import SettingScreen from "../Screens/SettingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.activeColor,
        activeBackgroundColor: Colors.primaryColor,
        inactiveBackgroundColor: Colors.primaryColor,
        inactiveTintColor: "white",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        component={SearchScreen}
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={WebinarScreen}
        name="Webinar"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="video-account"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={LeaderboardScreen}
        name="Leaderboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        component={SettingScreen}
        name="Setting"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
