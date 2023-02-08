import { gql, useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export const ProductItem: FC<any> = ({ product, navigation }): JSX.Element => {
  return (

    <View style={styles.productItemContainer}>
      <Image
        style={styles.productImage}
        source={{ uri: product.thumbnail.url }}
      />
      <View>
        <Text>{product.name}</Text>
        <Text style={styles.pricingText}>
          {' '}
          ${product.pricing.priceRange.start.gross.amount}
        </Text>
      </View>
    </View>

  );
};

export default function ProductList({ navigation }: any) {
  const { loading, data, error } = useQuery(PRODUCT_QUERY, {
    variables: { channel: 'default-channel', first: 50 },
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <FlatList
      data={data.products.edges}
      renderItem={({ item }) => {
        return (<TouchableOpacity onPress={() => { navigation.navigate("ProductDetail", { product: item.node }) }}>
          <ProductItem navigation={navigation} key={item.node.id} product={item.node} />
        </TouchableOpacity>);
      }}
    />
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 2,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  pricingText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

const PRODUCT_QUERY = gql`
  query GetProductList($first: Int, $channel: String) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          name
          id
          thumbnail {
            url
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
