import {Button, View} from 'react-native';
import React from 'react';
import ProductList from '../components/productComponents';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({navigation}: Props): JSX.Element => {
  return (
    <View>
      <Button
        title="Go to detail screen"
        onPress={() => navigation.navigate('ProductDetail')}
      />
      <ProductList />
    </View>
  );
};

export default Home;
