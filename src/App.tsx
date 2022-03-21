import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useSelector} from 'react-redux';

import store, {RootState} from '~/store';
import AuthScreen from '~/views/AuthScreen';
import SigninScreen from '~/views/SigninScreen';
import Step1 from '~/views/SignupScreen/Step1';
import Step2 from '~/views/SignupScreen/Step2';
import Step3 from '~/views/SignupScreen/Step3';
import Step4 from '~/views/SignupScreen/Step4';
import Step5 from '~/views/SignupScreen/Step5';
import Main from './Main';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const signupOptions = {headerTitle: 'Register Account', headerTitleStyle: {fontSize: 18}, headerShadowVisible: false};
  const [token, setToken] = useState<string | null>(null);
  const {signedIn} = useSelector((state: RootState) => state.user);

  async function getToken() {
    const token = await AsyncStorage.getItem('jt');
    console.log('_______', token);
    setToken(token);
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getToken();
  }, [signedIn]);

  return (
    <Stack.Navigator initialRouteName="Auth">
      {!token ? (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignupStep1" component={Step1} options={signupOptions} />
          <Stack.Screen name="SignupStep2" component={Step2} options={signupOptions} />
          <Stack.Screen name="SignupStep3" component={Step3} options={signupOptions} />
          <Stack.Screen name="SignupStep4" component={Step4} options={signupOptions} />
          <Stack.Screen name="SignupStep5" component={Step5} options={signupOptions} />
        </>
      ) : (
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
