import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import OrderScreen from './views/OrderScreen';
import WarehouseScreen from './views/WarehouseScreen';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {ROLE} from './constants/role';
import ImExScreen from './views/ImExScreen';

const Tab = createBottomTabNavigator();

const Main = () => {
  const {user} = useSelector((state: RootState) => state.user);

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
      {user.roles.some(role => role.role === ROLE.ADMIN) ? (
        <Tab.Screen
          name="Im/Ex"
          component={ImExScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <AntDesign name="export" color={color} size={20} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="Order"
          component={OrderScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <AntDesign name="shoppingcart" color={color} size={20} />,
          }}
        />
      )}
      <Tab.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name="CodeSandbox" color={color} size={20} />,
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
