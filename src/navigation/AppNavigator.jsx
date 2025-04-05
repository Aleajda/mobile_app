import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import Header from '../components/header/Header';
import ProfileScreen from '../screens/MyProfileScreen';
import CustomDrawer from './CustomDraver';
import UsersScreen from '../screens/UsersScreen';
import { Text, View } from 'react-native';
import GoBackHeader from '../components/header/GoBackHeader';
import SitesScreen from '../screens/SitesScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" drawerContent={(props) => <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="MainPage" component={MainScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  initialParams={{ aboutMeButton: true }}/>
        <Drawer.Screen name="Users" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Sites" component={SitesScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="UsersWithHomeButtons" component={ProfileScreen} options={({ navigation }) => ({header: () => <View><Header navigation={navigation} /><GoBackHeader /></View>, drawerItemStyle: {display: 'none'}})} initialParams={{ aboutMeButton: false }}/>
        {/* Не сделано */}
        <Drawer.Screen name="Корзина" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Поиск детали" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Контрагенты" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Заказы" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Платежи" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Документы" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Отчеты" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Профили поставщиков" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
        <Drawer.Screen name="Помощь" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
