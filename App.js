import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./Context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { init, contentInit, dropTable } from "./database/database";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const loading = async () => {
      if (!ready) {
        await SplashScreen.preventAutoHideAsync();
        // await dropTable("content");
        await init().catch((e) => console.log(e));
        await contentInit((e) => console.log(e));
        setReady(true);
        await SplashScreen.hideAsync();
      }
    };
    loading();
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
