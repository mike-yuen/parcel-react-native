import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import GetLocation, {Location} from 'react-native-get-location';
import MapView, {Marker} from 'react-native-maps';

const WarehouseScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState({} as Location);

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
        <MapView
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="{marker.title}"
            description="{marker.description}"
          />
        </MapView>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default WarehouseScreen;
