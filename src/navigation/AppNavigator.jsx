import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import Header from '../components/header/Header';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from './CustomDraver';
import UsersScreen from '../screens/UsersScreen';
import { Text, View, ActivityIndicator } from 'react-native';
import GoBackHeader from '../components/header/GoBackHeader';
import SitesScreen from '../screens/SitesScreen';
import ContractorScreen from '../screens/ContractorScreen';
import ProductCardScreen from '../screens/ProductCardScreen';
import SiteScreen from '../screens/SiteScreen';
import SearchDetailScreen from '../screens/search/SearchDetailScreen';
import FoundDetailScreen from '../screens/search/FoundDetailScreen';
import OrderPlacingScreen from '../screens/OrderPlacingScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDescriptionScreen from '../screens/OrderDescriptionScreen';
import { AuthProvider, useAuth } from '../api/AuthContext';


const Drawer = createDrawerNavigator();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <Drawer.Navigator 
      initialRouteName={isAuthenticated ? "Profile" : "Login"} 
      drawerContent={(props) => <CustomDrawer {...props}/>}
      screenOptions={{
        swipeEnabled: isAuthenticated,
      }}
    >
      <Drawer.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen name="MainPage" component={MainScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})}  initialParams={{ aboutMeButton: true }}/>
      <Drawer.Screen name="Users" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Sites" component={SitesScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="UsersWithHomeButtons" component={ProfileScreen} options={({ navigation }) => ({header: () => <View><Header navigation={navigation} /><GoBackHeader goTo={"Users"} contractor={false}/></View>, drawerItemStyle: {display: 'none'}})} initialParams={{ aboutMeButton: false}}/>
      <Drawer.Screen name="ContractorsWithHomeButtons" component={ProfileScreen} options={({ navigation }) => ({header: () => <View><Header navigation={navigation} /><GoBackHeader goTo={"Contractors"} contractor={true}/></View>, drawerItemStyle: {display: 'none'}})} initialParams={{ aboutMeButton: false}}/>
      <Drawer.Screen name="Contractors" component={ContractorScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="ProductCard" component={ProductCardScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Site" component={SiteScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />, drawerItemStyle: {display: 'none'}})} />
      <Drawer.Screen name="Search detail" component={SearchDetailScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Found detail" component={FoundDetailScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="OrderPlacing" component={OrderPlacingScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />, drawerItemStyle: {display: 'none'}})} />
      <Drawer.Screen name="Orders" component={OrdersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="OrderDescription" component={OrderDescriptionScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />, drawerItemStyle: {display: 'none'}})} />

      {/* Не сделано */}
      {/* <Drawer.Screen name="Корзина" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Поиск детали" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Заказы" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Платежи" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Документы" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Отчеты" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Профили поставщиков" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} />
      <Drawer.Screen name="Помощь" component={UsersScreen} options={({ navigation }) => ({header: () => <Header navigation={navigation} />})} /> */}
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
