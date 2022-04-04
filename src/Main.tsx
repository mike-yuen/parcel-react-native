import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import OrderScreen from './views/OrderScreen';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior={'history'}
      screenOptions={{
        tabBarActiveTintColor: '#efb718',
        tabBarInactiveTintColor: '#a9b0ba',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name="home" color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name="shoppingcart" color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerTitleStyle: {fontSize: 18},
          headerShadowVisible: false,
          tabBarIcon: ({color}) => <AntDesign name="user" color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
