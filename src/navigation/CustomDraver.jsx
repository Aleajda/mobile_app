import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {
  
  const navigator = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{justifyContent: 'space-between', height: '100%'}}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#444'}} onPress={() => navigator.navigate("Login")}>
        <Text style={{ color: '#ff6347', fontSize: 16 }}>Выйти</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;