import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Text, View, Image } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StatusBarConfig from "./src/components/StatusBarConfig";
import Toast from 'react-native-toast-message';

const toastConfig = {
  customToast: ({ text1, text2, ...rest }) => (
    <View
      style={{
        backgroundColor: '#1c1c1c',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
      }}
    >
      <Image
        source={require('./assets/images/check_16px.png')}
        style={{ width: 16, height: 16, marginRight: 10 }}
      />
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{text1}</Text>
        {text2 ? (
          <Text style={{ color: '#aaa', fontSize: 13 }}>{text2}</Text>
        ) : null}
      </View>
    </View>
  ),
};

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
      <Toast config={toastConfig} />
    </>
  );
}
