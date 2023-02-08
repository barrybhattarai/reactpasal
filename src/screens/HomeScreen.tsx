import { Button, View } from 'react-native';
import React from 'react';
import ProductList from '../components/ProductComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({ navigation }: Props): JSX.Element => {
  return (
    <View>
      <ProductList navigation={navigation} />
    </View>
  );
};

export default Home;
