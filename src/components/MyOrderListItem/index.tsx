import React from 'react';
import {TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Text} from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS} from '~/constants/colors';

const MyOrderListItem = (props: any) => {
  const dimension = useWindowDimensions();
  const {data} = props;

  return (
    <View style={{flex: 1, borderTopWidth: 4, borderTopColor: colors.grey4}}>
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: dimension.width - 32,
          backgroundColor: colors.white,
        }}>
        {/* Order */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: dimension.width - 32,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginBottom: 4,
                color: colors.white,
                backgroundColor: '#ed4d2d',
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 4,
              }}>
              Order
            </Text>
            <Text style={{marginLeft: 6, fontWeight: '700'}}>
              {data.id.slice(0, 9)}...{data.id.slice(data.id.length - 6, data.id.length)}
            </Text>
          </View>
          <Button
            title="Copy"
            TouchableComponent={TouchableWithoutFeedback}
            containerStyle={{borderRadius: 2, backgroundColor: 'transparent'}}
            buttonStyle={{backgroundColor: 'transparent'}}
            titleStyle={{color: '#ed4d2d', marginVertical: 2, fontSize: 14}}
            onPress={() => Clipboard.setString(data.id)}
          />
        </View>
        {/* Main */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: dimension.width - 32,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey5,
            paddingBottom: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <View
              style={{
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.grey5,
                paddingVertical: 1,
                width: 60,
                height: 64,
                borderRadius: 6,
              }}>
              <Text style={{fontSize: 12, color: colors.grey3}}>2023</Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  fontStyle: 'italic',
                  lineHeight: 26,
                  color: COLORS.darkGolden,
                }}>
                25
              </Text>
              <Text style={{fontSize: 12, lineHeight: 12, textTransform: 'uppercase', color: colors.grey3}}>Feb</Text>
            </View>
            <View
              style={{
                marginLeft: 16,
                paddingRight: 16,
                overflow: 'hidden',
              }}>
              <Text style={{textAlign: 'justify', color: COLORS.gray, marginBottom: 2, fontSize: 12}}>Recipient:</Text>
              {data && data.recipient && (
                <>
                  <Text style={{fontWeight: '700', fontSize: 15}}>{data.recipient.name}</Text>
                  <Text style={{fontSize: 14, color: colors.grey3}}>{data.recipient.phone}</Text>
                </>
              )}
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'right', color: COLORS.gray, marginBottom: 2, fontSize: 12}}>Total</Text>
            <Text style={{fontWeight: '700'}}>{data.value}đ</Text>
          </View>
        </View>
        {/* Sub-order */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: dimension.width - 32,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: colors.grey5,
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            {/* truck-fast */}
            {/* truck-check */}
            <Icon
              name="truck-delivery"
              type="material-community"
              size={18}
              color="#1cbc9f"
              tvParallaxProperties={undefined}
            />
            <Text style={{marginLeft: 8, fontSize: 14, color: '#1cbc9f'}}>Order is placed</Text>
          </View>
          <Icon
            name="chevron-right"
            type="material-community"
            size={22}
            color={colors.grey3}
            tvParallaxProperties={undefined}
          />
        </View>
        {/* Action */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: dimension.width - 32,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 8,
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            <Text style={{fontSize: 14, color: colors.grey4}}>You need our support?</Text>
          </View>
          <Button
            title={'Support'}
            buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4, paddingVertical: 4, paddingHorizontal: 12}}
            titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
            onPress={() => console.log('Support')}
          />
        </View>
      </View>
    </View>
  );
};

export default MyOrderListItem;
