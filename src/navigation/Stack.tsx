import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import COLORS from '../constants/colors';
import Detail from '../screens/Detail/Detail';
import { useColorScheme } from 'react-native';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? COLORS.BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? COLORS.WHITE_COLOR : COLORS.BLACK_COLOR,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
