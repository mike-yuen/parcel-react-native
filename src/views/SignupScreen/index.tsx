import React from 'react';
import {View} from 'react-native';

import MyScreenSlider from '~/components/MyScreenSlider';
import StepOne from './StepOne';

const SignupScreen = () => {
  const slides = [{key: 'StepOne'}, {key: 'StepTwo'}];

  const _renderItem = ({item, goToNext}: any) => {
    switch (item.key) {
      case 'StepOne':
        return <StepOne onNext={goToNext} />;
      default:
        return <View></View>;
    }
  };

  return <MyScreenSlider renderItem={_renderItem} data={slides} />;
};

export default SignupScreen;
