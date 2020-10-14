import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../Screens/SearchScreen";
import CourseScreen from "../Screens/CourseScreen";
import RazorPayScreen from "../Screens/RazorPayScreen";
import CourseDetailsScreen from "../Screens/CourseDetailsScreen";
import WebinarDetailsScreen from "../Screens/WebinarDetailsScreen";
import BlogScreen from "../Screens/BlogScreen";

const Stack = createStackNavigator();
const CourseNavigator = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="Pay" component={RazorPayScreen} />
      <Stack.Screen name="Details" component={CourseDetailsScreen} />
      <Stack.Screen name="Webinar" component={WebinarDetailsScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;
