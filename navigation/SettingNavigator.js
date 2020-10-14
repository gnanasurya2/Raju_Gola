import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../Screens/SettingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import WalletScreen from "../Screens/WalletScreen";

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
