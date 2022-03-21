import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './views/HomeScreen';
import SettingScreen from './views/SettingScreen';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => <FontAwesome name="bars" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
