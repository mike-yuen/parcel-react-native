import React from 'react';
import {View} from 'react-native';

import MyScreenSlider from '~/components/MyScreenSlider';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const SignupScreen = ({navigation}: any) => {
  const slides = [{key: 'Step1'}, {key: 'Step2'}, {key: 'Step3'}, {key: 'Step4'}, {key: 'Step5'}];

  const _renderItem = ({item, goToNext}: any) => {
    switch (item.key) {
      case 'Step1':
        return <Step1 onNext={goToNext} />;
      case 'Step2':
        return <Step2 onNext={goToNext} />;
      case 'Step3':
        return <Step3 onNext={goToNext} />;
      case 'Step4':
        return <Step4 onNext={goToNext} />;
      case 'Step5':
        return <Step5 onDone={() => navigation.navigate('Main')} />;
      default:
        return <View></View>;
    }
  };

  return <MyScreenSlider renderItem={_renderItem} data={slides} />;
};

export default SignupScreen;
