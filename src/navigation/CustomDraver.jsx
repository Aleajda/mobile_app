import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{justifyContent: 'space-between', height: '100%'}}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#444'}}>
        <Text style={{ color: '#ff6347', fontSize: 16 }}>Выйти</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;