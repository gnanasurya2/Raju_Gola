import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../Screens/SignUpScreen";
import SignInScreen from "../Screens/SignInScreen";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SignIn">
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
