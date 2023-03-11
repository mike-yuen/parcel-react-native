import React, {useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Button} from 'react-native-elements';
import GetLocation, {Location} from 'react-native-get-location';
import MapView, {Marker} from 'react-native-maps';

const MyMap = (props: any) => {
  const dimension = useWindowDimensions();
  const [currentLocation, setCurrentLocation] = useState({} as Partial<Location>);

  useEffect(() => {
    GetLocation.getCurrentPosition({enableHighAccuracy: true, timeout: 15000})
      .then(location => {
        setCurrentLocation(location);
      })
      .catch(() => {
        setCurrentLocation({} as Location);
      });
  }, []);

  return (
    <>
      {currentLocation.latitude && currentLocation.longitude ? (
        <View style={{position: 'relative', flex: 1}}>
          <MapView
            style={{position: 'absolute', width: dimension.width, height: dimension.height}}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onDoublePress={e => setCurrentLocation(e.nativeEvent.coordinate)}>
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="{marker.title}"
              description="{marker.description}"
            />
          </MapView>
          <Button
            title={'Confirm'}
            onPress={() => {
              console.log('Confirm: ', currentLocation);
            }}
            containerStyle={{position: 'absolute', bottom: 0, width: dimension.width, zIndex: 2}}></Button>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default MyMap;
