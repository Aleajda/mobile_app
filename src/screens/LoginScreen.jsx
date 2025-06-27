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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Поля для регистрации
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [inn, setInn] = useState("");
  const [email, setEmail] = useState("");
  const [mphone, setMphone] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      setLoading(true);
      setError("");
      
      try {
        const sessionId = await AuthApi.login(username, password);
        if (sessionId) {
          navigation.navigate("MainPage", { username });
        } else {
          setError("Ошибка авторизации. Проверьте логин и пароль.");
        }
      } catch (error) {
        setError(error.message || "Ошибка авторизации");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Введите имя пользователя и пароль");
    }
  };
  
  const handleRegister = async () => {
    if (!lastname || !name || !email || !mphone) {
      setError("Заполните обязательные поля");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const userData = {
        lastname,
        name,
        middlename,
        inn,
        email,
        mphone
      };
      
      const result = await AuthApi.registerUser(userData);
      if (result) {
        setModalVisible(true);
      } else {
        setError("Ошибка при регистрации");
      }
    } catch (error) {
      setError(error.message || "Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };
  
  StatusBar.setBarStyle("dark-content");

  return (
    <View style={styles.container}>
         <StatusBar barStyle='light-content' backgroundColor="#1E1E1E" />
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
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
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
            <TouchableOpacity 
                style={[styles.button, loading && styles.disabledButton]} 
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Вход..." : "Войти"}</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Имя"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Фамилия"
                value={lastname}
                onChangeText={setLastname}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Отчество"
                value={middlename}
                onChangeText={setMiddlename}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="ИНН"
                value={inn}
                onChangeText={setInn}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholderTextColor="#828282"
                style={styles.input}
                placeholder="Мобильный телефон"
                value={mphone}
                onChangeText={setMphone}
            />
            <TouchableOpacity 
                style={[styles.button, loading && styles.disabledButton]} 
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={[styles.buttonText, {fontFamily: "Emblema"}]}>
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Text>
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
  disabledButton: {
    backgroundColor: "#007bff80",
  },
  buttonText: {
    fontFamily: 'Roboto',
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontFamily: 'Roboto',
    color: "#E53935",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
