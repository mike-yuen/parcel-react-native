import React, {Fragment} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Button, colors, Image, Tab, TabView, Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import MyHeader from '~/components/MyHeader';

import notFoundImage from '~/assets/not-found.png';
import guide1Image from '~/assets/guide-1.png';
import guide2Image from '~/assets/guide-2.png';

const carouselItems = [
  {
    title: "Beginner's Guide",
    text: 'Learn how to get started',
    image: guide1Image,
  },
  {
    title: 'How to track your parcel',
    text: 'Try our new webapp',
    image: guide2Image,
  },
];

const _renderItem = ({item, index}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5,
      }}>
      <View>
        <Text style={{fontSize: 15, color: '#24252a', marginBottom: 4}}>{item.title}</Text>
        <Text style={{fontSize: 13, color: '#8c8f96'}}>{item.text}</Text>
      </View>
      <Image source={item.image} containerStyle={{width: 40, height: 40, marginRight: 20}} />
    </View>
  );
};

const HomeScreen = ({navigation}: any) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <MyHeader />
      </View>
      <ScrollView style={{flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <Carousel
          layout={'default'}
          data={carouselItems}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          renderItem={_renderItem}
          loop
          autoplay
          enableMomentum={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: number) => setActiveIndex(index)}
        />
        <View style={{paddingHorizontal: 16}}>
          <Text style={{fontSize: 24, fontWeight: '700', color: '#24252a', paddingTop: 18}}>Parcels</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14}}>
            <View style={{flexDirection: 'row'}}>
              <Button
                title="All"
                containerStyle={{width: 60}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600'}}
              />
              <Button
                icon={{
                  type: 'antdesign',
                  name: 'star',
                  size: 18,
                  color: '#b6bdc7',
                  style: {marginTop: 1, marginBottom: 2},
                }}
                containerStyle={{width: 60, marginLeft: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                title="Hot"
                icon={{
                  type: 'antdesign',
                  name: 'arrowdown',
                  size: 18,
                  color: '#24252a',
                }}
                iconRight
                containerStyle={{width: 70, marginLeft: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', marginLeft: 4}}
              />
            </View>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={notFoundImage}
              containerStyle={{
                width: 92,
                height: 84,
                alignSelf: 'center',
                marginTop: 30,
              }}
            />
            <Text style={{fontSize: 12, color: '#8c8f96', marginTop: 6}}>No parcels found</Text>
            <Button
              title="Create new request"
              containerStyle={{marginTop: 14, marginBottom: 20}}
              buttonStyle={{backgroundColor: '#f4b41f', borderRadius: 4}}
              titleStyle={{color: colors.black, fontSize: 14, marginVertical: 0, marginHorizontal: 20}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
