import React from 'react';
import {Button} from 'react-native-elements';

const WarehouseScreen = ({navigation}: any) => {
  return <Button title="Map" onPress={() => navigation.navigate('Search')} />;
};

export default WarehouseScreen;
