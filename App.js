import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Text, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StatusBarConfig from "./src/components/StatusBarConfig";

export default function App() {

  const [loaded, error] = useFonts({
      'Roboto': require('./assets/fonts/Roboto.ttf'),
      'Emblema': require('./assets/fonts/EmblemaOne-Regular.ttf')
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return (
        <View>
          <StatusBarConfig />
          <Text>Loading...</Text>
        </View>
      );
    }


  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Emblema" };


  return (
    <>
      <StatusBarConfig />
      <AppNavigator />
    </>
  );
}
