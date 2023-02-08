import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './src/screens/HomeScreen';
import ProductDetail from './src/screens/ProductDetail';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: any };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const client = new ApolloClient({
    uri: 'https://pasaleor-staging.eu.saleor.cloud/graphql/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />

          <RootStack.Screen name="ProductDetail" component={ProductDetail}
            options={
              ({ route }) => ({ title: route.params.product.name })
            }
          />


        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // textAlign: "center"
  },
  buttonContainer: {
    width: 100,
  },
});
export default App;
