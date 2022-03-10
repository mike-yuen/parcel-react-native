import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthScreen from '~/views/AuthScreen';
import SigninScreen from '~/views/SigninScreen';
import SignupScreen from '~/views/SignupScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}} />
      <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerTitle: 'Register Account', headerTitleStyle: {fontSize: 18}, headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
