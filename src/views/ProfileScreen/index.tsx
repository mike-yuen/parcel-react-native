import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, colors, Divider, Icon, Image, Switch, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {signOut} from '~/store/slices/userSlice';

import avatarHolderImage from '~/assets/avatar.png';
import bgImage from '~/assets/profile-bg.png';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  async function delToken() {
    await AsyncStorage.removeItem('jt');
  }

  async function handleSignOut() {
    await delToken();
    dispatch(signOut());
  }

  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingTop: 2,
            paddingBottom: 12,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={avatarHolderImage}
              containerStyle={{
                width: 60,
                height: 60,
                borderRadius: 60,
              }}
            />
            <View style={{marginLeft: 14}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#202a34', fontSize: 20, fontWeight: '700'}}>MikeYuen</Text>
                <Icon
                  name="chevron-right"
                  type="fontawesome"
                  color="#9399a5"
                  size={28}
                  style={{marginLeft: 2, marginTop: 0}}
                  tvParallaxProperties={undefined}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#878c90', fontSize: 14, marginTop: 6}}>ID: 293803547</Text>
                <Icon
                  name="md-copy"
                  type="ionicon"
                  color="#9399a5"
                  size={18}
                  style={{marginLeft: 6, marginTop: 4}}
                  tvParallaxProperties={undefined}
                />
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#dff4ed',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }}>
              <Icon name="check-decagram" type="material-community" color="#2bbe87" tvParallaxProperties={undefined} />
              <Text style={{color: '#2bbe87', marginLeft: 4}}>Verified</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fafafa',
            marginHorizontal: 20,
            marginBottom: 10,
            paddingVertical: 6,
            paddingHorizontal: 14,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="diamond" type="material-community" color="#f9be46" size={18} tvParallaxProperties={undefined} />
            <Text style={{fontWeight: '700', color: '#daa400', marginLeft: 4}}>VIP 0</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#daa400', marginRight: 6}}>Use Point to get discount</Text>
            <Icon name="chevron-right" type="fontawesome" color="#9399a5" size={18} tvParallaxProperties={undefined} />
          </View>
        </View>
      </View>

      <Image source={bgImage} width={Dimensions.get('window').width}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 18,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Parcel </Text>
            <Text style={{fontSize: 16, color: '#daa400'}}>Go</Text>
          </View>
          <Switch></Switch>
        </View>
      </Image>

      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.group}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type="font-awesome"
              name="credit-card-alt"
              size={18}
              color="#919ba5"
              tvParallaxProperties={undefined}
            />
            <Text style={{color: '#202123', fontSize: 16, marginLeft: 12}}>Payment methods</Text>
          </View>
          <Icon type="font-awesome" name="chevron-right" size={14} color="#babdcc" tvParallaxProperties={undefined} />
        </View>
        <Divider color={colors.grey5} width={1}></Divider>
        <View style={styles.group}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon type="font-awesome" name="sliders" size={22} color="#919ba5" tvParallaxProperties={undefined} />
            <Text style={{color: '#202123', fontSize: 16, marginLeft: 14}}>Settings</Text>
          </View>
          <Icon type="font-awesome" name="chevron-right" size={14} color="#babdcc" tvParallaxProperties={undefined} />
        </View>

        <Button
          title="Sign out"
          containerStyle={{marginVertical: 20, paddingHorizontal: 16}}
          buttonStyle={{backgroundColor: '#ebecf0'}}
          titleStyle={{fontSize: 16, color: '#1d1e22', paddingVertical: 4}}
          onPress={handleSignOut}></Button>

        <Text style={{paddingHorizontal: 16, fontSize: 12, color: '#9a9da6', lineHeight: 16}}>
          Please do not disclose SMS and Google Authentication codes to anyone, including ParcelGo Custormer Support.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
});

export default ProfileScreen;
