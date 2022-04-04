import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';

const OrderScreen = ({navigation}: any) => {
  return (
    <>
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <View>
          <Text>Calculate shipping rates</Text>
          <View>
            <Text>Parcel</Text>
            <Text>Go</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View>
          <View>
            <Text>Sender Information</Text>
            <Button></Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OrderScreen;
