import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import ImageCarousel from '../components/ImageCarousel';

const ProductDetail = ({ route }: any) => {

  const productProps = route.params.product;

  const { error, loading, data } = useQuery(GET_PRODUCT_DETAIL, { variables: { id: productProps.id, channel: "default-channel" } })

  if (loading) return <View style={styles.loadingIndicator}>

    <ActivityIndicator size={30} />
  </View>
  if (error) return <Text>{error.message}</Text>

  return (<View style={styles.productDetailContainer} >
    <ImageCarousel media={data.product.media} />
  </View>);
}

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: 'contain',
    marginTop: 10

  },
  loadingIndicator: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: "center"

  }
});

export default ProductDetail;


const GET_PRODUCT_DETAIL = gql`
query GetProductDetail($id: ID!, $channel: String!) {
  product(id: $id, channel: $channel) {
    id
    name
    pricing {
      onSale
      discount {
        gross {
          amount
        }
      }
      priceRange {
        start {
          gross {
            amount
          }
        }
      }
    }
    defaultVariant {
      id
    }
    media {
      url
    }
    thumbnail {
      url
    }
  }
}
`;