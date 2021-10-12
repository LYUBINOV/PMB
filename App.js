/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DashboardView from './views/DashboardView/DashboardView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailView from './views/DetailView/DetailView';
import { GlobalStyles } from './styles/GlobalStyles';
import VideoView from './views/VideoView/VideoView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen 
          options={{
            headerShown: false
          }} 
          name="Dashboard" 
          component={DashboardView} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailView}
          options={{
            headerStyle: {
              backgroundColor: GlobalStyles.backgroundColor,
            },
            headerTintColor: GlobalStyles.textColor,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Video" 
          component={VideoView}
          options={{
            headerShown: false
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
