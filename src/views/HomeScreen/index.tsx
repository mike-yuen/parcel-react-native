import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, colors, Image, Tab, TabView, Text} from 'react-native-elements';

import emptyImage from '~/assets/empty.png';
import MyHeader from '~/components/MyHeader';
import MyTrackingBar from '~/components/MyTrackingBar';

const tabItems = [{title: 'All'}, {title: 'Delivering'}, {title: 'Received'}];

const HomeScreen = ({navigation}: any) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <ScrollView style={styles.container}>
      <MyHeader />
      <MyTrackingBar />
      <Tab value={activeIndex} onChange={setActiveIndex} indicatorStyle={{backgroundColor: '#5f5fff', height: 2}}>
        {tabItems.map((tabItem, index) => (
          <Tab.Item
            key={tabItem.title}
            title={tabItem.title}
            titleStyle={StyleSheet.flatten([{color: index === activeIndex ? '#5f5fff' : colors.grey3}, styles.tabItem])}
            containerStyle={{backgroundColor: colors.white}}
          />
        ))}
      </Tab>

      <TabView value={activeIndex} onChange={setActiveIndex} animationType="timing">
        <TabView.Item
          style={{
            backgroundColor: '#f8f8f8',
            width: '100%',
            paddingHorizontal: 16,
          }}>
          <View style={{padding: 30, alignItems: 'center'}}>
            <Image
              source={emptyImage}
              containerStyle={{
                width: 200,
                height: 140,
                alignSelf: 'center',
              }}
            />
            <Text style={{fontSize: 18, fontWeight: '700', color: colors.grey1, marginTop: 20}}>
              You have no orders
            </Text>
            <Text style={{fontSize: 12, color: colors.grey3, marginTop: 6}}>
              You have no orders
            </Text>
            <Button
              title="Create new request"
              containerStyle={{marginTop: 14, marginBottom: 20}}
              buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
              titleStyle={{color: colors.white, marginVertical: 0, marginHorizontal: 20}}
            />
          </View>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabItem: {
    fontSize: 12,
    paddingVertical: 2,
    textTransform: 'none',
  },
});

export default HomeScreen;
