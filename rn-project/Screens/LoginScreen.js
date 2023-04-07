import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import * as Font from "expo-font";
import  AppLoading  from 'expo-app-loading';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';


  const initialState = {
    email: '',
    password: '',
  };

const loadAplication = async () => {
    await Font.loadAsync({
       "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    'Roboto-Reg': require('../assets/fonts/Roboto-Regular.ttf'),
  });
};

  export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setstate] = useState(initialState);
    const [isReady, setIsReady] = useState(false);
    const [dimensions, setDimentions] = useState(Dimensions.get('window').width - 20 * 2);

    useEffect(() => {
      const onChange = () => {
        const width = Dimensions.get('window').width- 20 * 2;
        setDimentions(width);
      }
      Dimensions.addEventListener('change', onChange);
      return () => {
        Dimensions.removeEventListener('change', onChange);
      }
     }, []);
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
  };
    
    if (!isReady) {
      return (<AppLoading startAsync={loadAplication} onFinish={() => setIsReady(true)}
      onError={console.warn}/>);
    }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      
      <ImageBackground style={styles.image} source={require('../images/photo.jpg')}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{
              ...styles.form, marginBottom: isShowKeyboard ? 20 : 113,
                          width: dimensions,
                      }}>
            
            <Text style={styles.header}>Войти</Text>
            
            <View style={{marginTop: 16}}>
              <TextInput style={styles.input}
                placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, email: value }))}
                value={state.email}/>
          </View>
        
        
        <View style={{marginTop: 16}}>
            <TextInput style={styles.input}
                secureTextEntry={true}
                placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, password: value }))}
                value={state.password}/>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={keyboardHide}>
              <Text style={styles.btnStyle}>Войти</Text>
              
          </TouchableOpacity>
          </View>
          
     </KeyboardAvoidingView>
       <View>
            <Text style={styles.footer}>Нет аккаунта? Зарегистрироваться</Text>
          </View>
      </ImageBackground>
      
        {/* <StatusBar style="auto" /> */}
        
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "flex-end",
     alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginHorizontal: 16,
    height: 50,
    borderRadius: 8,
    color: "#BDBDBD",
    paddingLeft: 16,
    fontFamily: "Roboto-Reg",
    backgroundColor: "#F6F6F6",
  },

  form: {
    marginHorizontal: 16,
  
  },

  btn: {
      backgroundColor: "#FF6C00",
      marginHorizontal: 16,
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  btnStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 16,
  },

  footer: {
      color: "#1B4371",
      marginBottom: 78,
    },
  
  header: {
      textAlign: "center",
    fontSize: 30,
      marginBottom: 32,
    fontFamily: "Roboto-Bold",
  }
});