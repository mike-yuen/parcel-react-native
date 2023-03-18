import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {colors, Text} from 'react-native-elements';

import MySearch from '~/components/MySearch';
import store, {RootState} from '~/store';
import {search} from '~/store/slices/searchSlice';
import {localSignIn} from '~/store/slices/userSlice';
import AuthScreen from '~/views/AuthScreen';
import MapScreen from '~/views/MapScreen';
import ProductScreen from '~/views/ProductScreen';
import SearchScreen from '~/views/SearchScreen';
import SigninScreen from '~/views/SignInScreen';
import Step1 from '~/views/SignupScreen/Step1';
import Step2 from '~/views/SignupScreen/Step2';
import Step3 from '~/views/SignupScreen/Step3';
import Step4 from '~/views/SignupScreen/Step4';
import Step5 from '~/views/SignupScreen/Step5';
import Step6 from '~/views/SignupScreen/Step6';
import Main from './Main';
import RecipientScreen from './views/RecipientScreen';
import OrderDetailsScreen from './views/OrderDetailsScreen';
import OrderStatusScreen from './views/OrderStatusScreen';
import VerifyScreen from './views/VerifyScreen';

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
    const storageToken = await AsyncStorage.getItem('jt');
    if (storageToken && !signedIn) {
      dispatch(localSignIn());
    }
    setToken(storageToken);
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
          <Stack.Screen name="SignupStep6" component={Step6} options={signupOptions} />
        </>
      ) : (
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      )}
      <Stack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Email Auth',
          headerTintColor: colors.grey1,
          headerTitleStyle: {fontSize: 16},
          headerShadowVisible: false,
        }}></Stack.Screen>
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
      <Stack.Screen
        name="Detail"
        options={{
          headerTitle: props => <Text style={{textAlign: 'center', fontSize: 16}}>Order Details</Text>,
          headerShadowVisible: false,
          presentation: 'fullScreenModal',
        }}>
        {props => <OrderDetailsScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Status"
        options={{
          headerTitle: props => <Text style={{textAlign: 'center', fontSize: 16}}>Order Status</Text>,
          headerShadowVisible: false,
          presentation: 'fullScreenModal',
        }}>
        {props => <OrderStatusScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Product',
          headerTintColor: colors.grey1,
          headerTitleStyle: {fontSize: 16},
          headerShadowVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="Recipient"
        component={RecipientScreen}
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Recipient',
          headerTintColor: colors.grey1,
          headerTitleStyle: {fontSize: 16},
          headerShadowVisible: false,
        }}></Stack.Screen>
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
