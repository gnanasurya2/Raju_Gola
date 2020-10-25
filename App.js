import React, { useState, useEffect } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./Context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { init, contentInit, webinarInit } from "./database/database";
import AsyncStorage from "@react-native-community/async-storage";
LogBox.ignoreLogs(["Setting a timer for"]);
export default function App() {
  const [ready, setReady] = useState(false);
  const loading = async () => {
    if (!ready) {
      await SplashScreen.preventAutoHideAsync();
      await init();
      await contentInit();
      await webinarInit();
      AsyncStorage.setItem("firstTime", "false");
      setReady(true);
      await SplashScreen.hideAsync();
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("firstTime").then((data) => {
      if (data === null) {
        loading();
      } else {
        SplashScreen.hideAsync();
      }
    });
  }, []);
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
