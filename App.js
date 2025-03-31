import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Text, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  const [loaded, error] = useFonts({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'Emblema': require('./assets/fonts/EmblemaOne-Regular.ttf')
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      <View><Text>Loading...</Text></View>;
    }


  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Emblema" };


  return <AppNavigator />;
}
