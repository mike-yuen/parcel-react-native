import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {colors} from 'react-native-elements';

import MySearch from '~/components/MySearch';
import store, {RootState} from '~/store';
import {search} from '~/store/slices/searchSlice';
import {localSignIn} from '~/store/slices/userSlice';
import AuthScreen from '~/views/AuthScreen';
import MapScreen from '~/views/MapScreen';
import SearchScreen from '~/views/SearchScreen';
import SigninScreen from '~/views/SigninScreen';
import Step1 from '~/views/SignupScreen/Step1';
import Step2 from '~/views/SignupScreen/Step2';
import Step3 from '~/views/SignupScreen/Step3';
import Step4 from '~/views/SignupScreen/Step4';
import Step5 from '~/views/SignupScreen/Step5';
import Main from './Main';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const signupOptions: NativeStackNavigationOptions = {
    headerTitle: 'Register Account',
    headerTintColor: colors.grey1,
    headerTitleStyle: {fontSize: 16},
    headerShadowVisible: false,
  };
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  const {signedIn} = useSelector((state: RootState) => state.user);

  async function getToken() {
    const token = await AsyncStorage.getItem('jt');
    if (token && !signedIn) {
      dispatch(localSignIn());
    }
    setToken(token);
  }

  function searchLocation(keyword: string) {
    dispatch(search(keyword));
  }

  const debounceSearchLocation = useCallback(
    debounce(() => searchLocation(keyword), 1000),
    [keyword],
  );

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getToken();
  }, [signedIn]);

  useEffect(() => {
    debounceSearchLocation();
  }, [keyword]);

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
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Choose your location',
          headerTintColor: colors.grey1,
          headerTitleStyle: {fontSize: 16},
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Search"
        options={{
          headerTitle: props => <MySearch {...props} onChange={(data: string) => setKeyword(data)} />,
          headerShadowVisible: false,
          presentation: 'fullScreenModal',
        }}>
        {props => <SearchScreen {...props} />}
      </Stack.Screen>
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
