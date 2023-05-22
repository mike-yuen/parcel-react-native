import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Image, Input, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from 'luxon';
import {launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';

import {COLORS} from '~/constants/colors';
import {ORDER_STATUS, SUB_ORDER_TYPE} from '~/constants/status';
import {RootState} from '~/store';
import {cancelOrder, getOrders, importParcel, processOrder, uploadImage} from '~/store/slices/orderSlice';
import {ROLE} from '~/constants/role';
import MyInput from '../MyInput';
import {parcelApi} from '~/services/api';

const MyOrderListItem = (props: any) => {
  const dimension = useWindowDimensions();
  const {data} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;
  const {processedOrder} = useSelector((state: RootState) => state.order);
  const {user} = useSelector((state: RootState) => state.user);

  const {control, handleSubmit} = useForm();

  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [uploadFile, setUploadFile] = useState<any>(null);

  const onOpenPhotoModal = () => {
    setPhotoModalVisible(true);
  };

  const onClosePhotoModal = () => {
    setPhotoModalVisible(false);
  };

  const onOpenRejectModal = () => {
    setRejectModalVisible(true);
  };

  const onCloseRejectModal = () => {
    setRejectModalVisible(false);
  };

  // const onAcceptOrder = () => {
  //   dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.AWAITING_PICKUP}));
  // };

  // const onDeliverOrder = () => {
  //   dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.TRANSFERRING}));
  // };

  // const onDeliveredOrder = () => {
  //   dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.SUCCESS}));
  // };

  const onGoToDriverScreen = (orderId: string) => {
    navigation.navigate('Driver', {orderId: orderId, status: data.status});
  };

  const takeAPhoto = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (result.assets) {
      const image = result.assets[0];

      setUploadFile(image);
    }
  };

  const onUploadConfirmPhoto = () => {
    if (uploadFile) {
      const formData = new FormData();
      formData.append('orderId', data.id);
      formData.append('file', {
        uri: uploadFile.uri,
        name: uploadFile.fileName,
        type: uploadFile.type,
      });
      dispatch(uploadImage({formData, orderId: data.id, status: data.status}));
      setUploadFile(null);
    }
  };

  const onImport = async () => {
    dispatch(importParcel({orderId: data.id, warehouseId: data.warehouseId}));
  };

  const onRejectOrder = (formData: {[x: string]: string}) => {
    if (formData && formData.comment) {
      console.log('comment: ', formData);
      user.roles.some(role => [ROLE.ADMIN, ROLE.USER].includes(role.role))
        ? dispatch(cancelOrder({orderId: data.id, comment: formData.comment}))
        : dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.INIT}));
      onCloseRejectModal();
    }
  };

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
                backgroundColor: data.isExpress ? '#ed4d2d' : colors.grey2,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 4,
              }}>
              {data.isExpress ? 'Express' : 'Standard'}
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
              <Text style={{fontSize: 12, color: colors.grey3}}>{DateTime.fromISO(data.createdAt).year}</Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  fontStyle: 'italic',
                  lineHeight: 26,
                  color: COLORS.darkGolden,
                }}>
                {DateTime.fromISO(data.createdAt).day}
              </Text>
              <Text style={{fontSize: 12, lineHeight: 12, textTransform: 'uppercase', color: colors.grey3}}>
                {DateTime.fromISO(data.createdAt).monthShort}
              </Text>
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
            <Text style={{textAlign: 'right', fontWeight: '700'}}>
              {data.fee && `${data.fee.toLocaleString('en-US')}đ`}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 2}}>
              {
                {
                  [SUB_ORDER_TYPE.CLOTHES]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="ios-shirt" color={'blue'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Clothes</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.ELECTRIC]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="game-controller" color={'green'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Electric</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.FOOD]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="ios-fast-food" color={'orange'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Food</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.FRAGILE]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="material-community" name="glass-fragile" color={'purple'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Fragile</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.OTHERS]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="foundation" name="social-dropbox" color={'red'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Others</Text>
                    </View>
                  ),
                }[data.packageType as SUB_ORDER_TYPE]
              }
            </View>
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
            paddingVertical: 6,
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            {/* truck-fast */}
            {/* truck-check */}
            {
              {
                [ORDER_STATUS.INIT]: (
                  <>
                    <Icon name="truck-delivery" type="material-community" size={18} color={colors.grey4} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: colors.grey4}}>Order is processing</Text>
                  </>
                ),
                [ORDER_STATUS.AWAITING_PICKUP]: (
                  <>
                    <Icon name="truck-delivery" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>
                      Order is awaiting pickup
                    </Text>
                  </>
                ),
                [ORDER_STATUS.TRANSFERRING_TO_STOCK]: (
                  <>
                    <Icon name="truck-fast" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>
                      Order is transferring to stock
                    </Text>
                  </>
                ),
                [ORDER_STATUS.IN_STOCK]: (
                  <>
                    <Icon name="warehouse" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>Order is in stock</Text>
                  </>
                ),
                [ORDER_STATUS.TRANSFERRING]: (
                  <>
                    <Icon name="truck-fast" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>Order is delivering</Text>
                  </>
                ),
                [ORDER_STATUS.SUCCESS]: (
                  <>
                    <Icon name="truck-check" type="material-community" size={18} color="#1cbc9f" />
                    <Text style={{marginLeft: 8, fontSize: 14, color: '#1cbc9f'}}>Order is delivered</Text>
                  </>
                ),
                [ORDER_STATUS.FAIL]: <></>,
                [ORDER_STATUS.CANCELED]: (
                  <>
                    <Icon name="book-cancel" type="material-community" size={18} color={colors.grey4} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: colors.grey4}}>Order is canceled</Text>
                  </>
                ),
              }[data.status as ORDER_STATUS]
            }
          </View>

          {/* Actions */}
          {user.roles && !!user.roles.length
            ? {
                [ORDER_STATUS.INIT]: user.roles.some(role => role.role === ROLE.ADMIN) ? (
                  <Button
                    title={'Assign driver'}
                    buttonStyle={{
                      backgroundColor: COLORS.golden,
                      borderRadius: 4,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                    }}
                    titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                    onPress={() => onGoToDriverScreen(data.id)}
                  />
                ) : user.roles.some(role => role.role === ROLE.USER) ? (
                  <Button
                    title={'Cancel'}
                    buttonStyle={{
                      backgroundColor: colors.grey5,
                      borderRadius: 4,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                    }}
                    titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                    onPress={onOpenRejectModal}
                  />
                ) : (
                  <></>
                ),
                [ORDER_STATUS.AWAITING_PICKUP]: user.roles.some(role => role.role === ROLE.DRIVER) ? (
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      title={'Reject'}
                      buttonStyle={{
                        backgroundColor: colors.grey5,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                      }}
                      titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                      onPress={onOpenRejectModal}
                    />
                    <Button
                      title={'Pick up'}
                      buttonStyle={{
                        backgroundColor: COLORS.golden,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                        marginLeft: 6,
                      }}
                      titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                      onPress={onOpenPhotoModal}
                    />
                  </View>
                ) : (
                  <></>
                ),
                [ORDER_STATUS.TRANSFERRING_TO_STOCK]: user.roles.some(role => role.role === ROLE.ADMIN) ? (
                  <Button
                    title={'Import'}
                    buttonStyle={{
                      backgroundColor: COLORS.golden,
                      borderRadius: 4,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      marginLeft: 6,
                    }}
                    titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                    onPress={onImport}
                  />
                ) : (
                  <></>
                ),
                [ORDER_STATUS.IN_STOCK]: user.roles.some(role => role.role === ROLE.ADMIN) ? (
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      title={'Assign driver'}
                      buttonStyle={{
                        backgroundColor: COLORS.golden,
                        borderRadius: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                      }}
                      titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                      onPress={() => onGoToDriverScreen(data.id)}
                    />
                  </View>
                ) : (
                  <></>
                ),
                [ORDER_STATUS.TRANSFERRING]: user.roles.some(role => role.role === ROLE.DRIVER) ? (
                  <Button
                    title={'Delivery'}
                    buttonStyle={{
                      backgroundColor: COLORS.golden,
                      borderRadius: 4,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      marginLeft: 6,
                    }}
                    titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                    onPress={onOpenPhotoModal}
                  />
                ) : (
                  <></>
                ),
                [ORDER_STATUS.SUCCESS]: <></>,
                [ORDER_STATUS.FAIL]: <></>,
                [ORDER_STATUS.CANCELED]: <></>,
              }[data.status as ORDER_STATUS]
            : data.status === ORDER_STATUS.INIT && (
                <Button
                  title={'Cancel'}
                  buttonStyle={{
                    backgroundColor: colors.grey5,
                    borderRadius: 4,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                  }}
                  titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                  onPress={onOpenRejectModal}
                />
              )}
        </View>
      </View>

      <Modal
        isVisible={isRejectModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={onCloseRejectModal}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={{flex: 0.4, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <Text style={{textAlign: 'center', marginTop: 16, paddingVertical: 10, fontSize: 17, fontWeight: '700'}}>
            Are you sure?
          </Text>
          <Text style={{textAlign: 'center', paddingHorizontal: 24, color: colors.grey3, marginBottom: 12}}>
            Please tell us the reason why you are rejecting it
          </Text>
          <View style={{width: '100%', height: 200, paddingHorizontal: 24, marginTop: 12}}>
            <MyInput
              name="comment"
              control={control}
              rules={{required: true}}
              placeholder="Reason why"
              containerStyle={{marginTop: 4}}
              inputContainerStyle={{borderRadius: 8}}
            />
            <Button
              title={'Reject order'}
              containerStyle={{marginTop: 24}}
              buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
              titleStyle={{color: COLORS.black1, marginVertical: 2}}
              onPress={handleSubmit(onRejectOrder)}></Button>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isPhotoModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={onClosePhotoModal}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={{flex: 0.62, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <Text style={{textAlign: 'center', marginTop: 8, paddingVertical: 10, fontSize: 17, fontWeight: '700'}}>
            Take photo of parcel
          </Text>
          <Text style={{textAlign: 'center', paddingHorizontal: 24, color: colors.grey3, marginBottom: 12}}>
            Please take the parcel photo for confirmation
          </Text>
          <View style={{width: '100%', height: 200, paddingHorizontal: 24, marginTop: 12}}>
            {uploadFile && uploadFile.uri ? (
              <>
                <Image
                  source={{uri: uploadFile.uri}}
                  style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'contain',
                  }}></Image>
                <Button
                  title={data.status === ORDER_STATUS.TRANSFERRING ? 'Confirm delivery' : 'Confirm pickup'}
                  containerStyle={{marginTop: 24}}
                  buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
                  titleStyle={{color: COLORS.black1, marginVertical: 2}}
                  onPress={onUploadConfirmPhoto}></Button>
              </>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  height: '100%',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderColor: colors.grey5,
                  borderRadius: 18,
                }}>
                <Button
                  title={'Open camera'}
                  icon={{name: 'ios-camera-outline', type: 'ionicon', size: 60, color: colors.grey4}}
                  buttonStyle={{flexDirection: 'column', height: '100%', backgroundColor: 'transparent'}}
                  titleStyle={{color: colors.grey4}}
                  onPress={takeAPhoto}></Button>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyOrderListItem;
