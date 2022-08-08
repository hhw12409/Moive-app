import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const isDark = useColorScheme() === "dark";
  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
