import React, {useEffect, useState} from 'react';
import {initStripe, useStripe} from '@stripe/stripe-react-native';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-elements';
import {parcelApi} from '~/services/api';

const PaymentScreen = ({navigation, route}: any) => {
  const STRIPE_PUBLISHABLE_KEY =
    'pk_test_51Mn0NXKJyU3LBZTd55O8WhojcOoXPvqj9UjUFjV4u9E9cyHv6DRvKDt80H2hSwmoaECJx2iZQ1FiWZsNrhnqIrBb00COwefzFK';

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await parcelApi.createIntentPayment();
    const {paymentIntent, ephemeralKey, customer} = response;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
      // defaultBillingDetails: {
      //   name: 'Jane Doe',
      // },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
  };

  useEffect(() => {
    const runStripe = async () => {
      await initStripe({
        publishableKey: STRIPE_PUBLISHABLE_KEY,
      });
      initializePaymentSheet();
    };
    runStripe();
  });

  return (
    <View>
      <Button title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
};

export default PaymentScreen;
