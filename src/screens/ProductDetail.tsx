import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProductDetail = ({ route }: any) => {
  return (<View style={styles.productDetailContainer} >
    <Text>{route.params.id}</Text>
  </View>);
}

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
  },
});

export default ProductDetail;
