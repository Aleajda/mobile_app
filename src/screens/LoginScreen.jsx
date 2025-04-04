import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";

import { StyleSheet, StatusBar } from "react-native";
import PoliticModal from "../components/PoliticModal";
import AuthApi from "../api/AuthApi";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      // AuthApi.getSeed().then(async (res) => {
      //   await AuthApi.Login(username, password, res);
      //   console.log(await AuthApi.getSessionId());
      // })
      // navigation.navigate("MainPage", { username });
    } else {
      // AuthApi.getSeed();
      // console.log('sfsfd');
      // alert("Введите имя пользователя и пароль");
      navigation.navigate("MainPage", { username });
    }
  };
  StatusBar.setBarStyle("dark-content");

  return (
    <View style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>Sort1.pro</Text>
        </View>
        <Text style={styles.title} >Цифровое обслуживание клиентов</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setActiveTab(1)}>
              <View
                style={[
                  styles.tabContainer,
                  activeTab == 1 ? styles.activeTabContainer : null,
                ]}
              >
                <Text
                  style={[styles.tab, activeTab == 1 ? styles.activeTab : null]}
                >
                  Вход
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab(2)}>
              <View
                style={[
                  styles.tabContainer,
                  activeTab == 2 ? styles.activeTabContainer : null,
                ]}
              >
                <Text
                  style={[styles.tab, activeTab == 2 ? styles.activeTab : null]}
                >
                  Регистрация
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {activeTab == 1
          ?
          <View>
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Имя пользователя"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Имя"
                value={username}
                
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Фамилия"
                secureTextEntry
                value={password}
                
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Отчество"
                secureTextEntry
                value={password}
                
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="ИНН"
                secureTextEntry
                value={password}
                
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Email"
                secureTextEntry
                value={password}
                
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Мобильный телефон"
                secureTextEntry
                value={password}
                
            />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={[styles.buttonText, {fontFamily: "Emblema"}]}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        }
        </View>
      </View>
      <PoliticModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "auto",
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  brandContainer: {
    width: 84,
    height: 24,
    backgroundColor: "#2F80ED",
    borderRadius: 4,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  brand: {
    fontFamily: 'Roboto',
    color: "#333333",
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Roboto',
    padding: 16,
    color: "#fff",
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  form: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  tabs: {
    gap: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  tabContainer: {
    backgroundColor: "#3333330D",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tab: {
    fontFamily: 'Roboto',
    textAlign: "center",
    fontSize: 16,
    color: "#333333B2",
    fontWeight: 'bold',
  },
  activeTabContainer: {
    backgroundColor: "#2F80ED1A",
  },
  activeTab: {
    color: "#2F80ED",
  },
  input: {
    fontFamily: 'Roboto',
    height: 40,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    marginTop: 14,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: 'Roboto',
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
