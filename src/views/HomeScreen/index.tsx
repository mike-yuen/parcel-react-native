import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, colors, Icon, Tab, TabView, Text} from 'react-native-elements';

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
            <Icon
              name="package-variant"
              type="material-community"
              size={140}
              color="#e9eaed"
              tvParallaxProperties={undefined}
            />
            <Text style={{fontSize: 20, fontWeight: '700', color: '#b1b1b2'}}>No parcels to show</Text>
            <Button
              title="Create new request"
              containerStyle={{marginTop: 14, marginBottom: 20}}
              buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
              titleStyle={{color: colors.white, marginVertical: 2, marginHorizontal: 10}}
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
