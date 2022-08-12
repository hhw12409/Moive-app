import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>Go to</Text>
    </TouchableOpacity>
  );
};

const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Three")}>
      <Text>Go to Three</Text>
    </TouchableOpacity>
  );
};

const ScreenThree = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
      <Text>Go to Seach</Text>
    </TouchableOpacity>
  );
};

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTintColor: COLORS.YELLOW_COLOR,
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
