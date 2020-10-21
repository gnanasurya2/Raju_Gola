import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import HomeScreen from "../Screens/HomeScreen";
import WebinarScreen from "../Screens/WebinarScreen";
import LeaderboardScreen from "../Screens/LeaderboardScreen";
import SettingNavigator from "./SettingNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CourseNavigator from "./CourseNavigator";

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
        labelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        component={CourseNavigator}
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            console.log("inside");
            navigation.navigate("Search", {
              screen: "Search",
            });
          },
        })}
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
        component={SettingNavigator}
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
