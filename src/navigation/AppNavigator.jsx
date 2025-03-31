import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import Header from '../components/Header';
import ProfileScreen from '../screens/MyProfileScreen';
import CustomDrawer from './CustomDraver';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" drawerContent={(props) => <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="MainPage" component={MainScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
