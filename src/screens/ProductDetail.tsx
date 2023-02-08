import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ImageCarousel from '../components/ImageCarousel';
import Icon from "react-native-vector-icons/Foundation";
import RenderHTML from 'react-native-render-html';

const DIMENSIONS = Dimensions.get("window").width;

const ProductDetail = ({ route }: any) => {


  const { error, loading, data } = useQuery(GET_PRODUCT_DETAIL, { variables: { id: route.params.product.id, channel: "default-channel" } })

  if (loading) return <View style={styles.loadingIndicator}>

    <ActivityIndicator size={30} />
  </View>
  if (error) return <Text>{error.message}</Text>

  const product = data.product;
  const description = JSON.parse(product.description);

  return (<View style={styles.productDetailContainer} >
    {data.product.pricing.onSale && <Icon style={styles.saleIcon} name='burst-sale' color={"red"} size={40} />}
    <ImageCarousel media={data.product.media} />
    <View style={styles.productInfoContainer}>

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.pricing.priceRange.start.gross.amount}</Text>
      <View style={styles.productDescriptionContainer}>
        <RenderHTML
          contentWidth={DIMENSIONS - 40}
          source={{ html: description.blocks[0].data.text }}></RenderHTML>
      </View>
    </View>
  </View>);
}

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
    // position:"relative"
  },
  loadingIndicator: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: "center"

  },
  saleIcon: {
    position: "absolute",
    top: 10,
    right: 10

  },
  productName: {
    fontSize: 30,
    fontWeight: "600",
    color: 'coral'
  },
  productPrice: {
    fontSize: 24
  },
  productInfoContainer: {
    flex: 1,
    alignItems: "center"
  },
  productDescriptionContainer: {
    width: "100%",
    padding: 10
  }
});

export default ProductDetail;




const GET_PRODUCT_DETAIL = gql`
query GetProductDetail($id: ID!, $channel: String!) {
  product(id: $id, channel: $channel) {
    id
    name
    description
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