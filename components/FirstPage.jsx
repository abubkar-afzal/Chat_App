import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginAndSignUp from "./LoginAndSignup"
const FirstPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [btnActive, setbtnActive] = useState(false);
  const [btnDisable, setbtnDisable] = useState(true);
  const [Login,setLogin] =useState(false)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setbtnDisable(!btnDisable);
  };
  const activeButton = () => {
    setbtnActive(!btnActive);
  };

  return (
      Login ? <LoginAndSignUp /> 
      : 
      <View className={`my-auto items-center`}>
    <Text className={`font-bold text-[20px] mt-[2rem]`}>WELCOME TO PIGEON MESSAGE</Text>
    <View className='w-[90%] mb-[-6rem]'>
    <Image
      source={require('../assets/pigeon_main.png')}
      className="mt-[4rem] h-[50%] w-full"
    /></View>
    <ScrollView className="h-[2px] px-[2rem] my-[1rem] ">
      <Text>
        By using this application, you agree to the these terms that, You will not use this
        application for any illegal or unauthorized purposes. You are responsible for maintaining
        the confidentiality of your account and password. The application is provided "as is"
        without any warranties of any kind. The developers are not responsible for any data loss
        or damages resulting from the use of this application. You agree to comply with all
        applicable laws and regulations while using this application.
      </Text>
    </ScrollView>
    <View className="my-[1rem] flex w-full flex-row px-[5rem]">
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checkboxChecked]}
        className="mt-[10px]"
        onPress={toggleCheckbox}>
        {isChecked && <Text className="mt-[-2px] text-center">✔</Text>}
      </TouchableOpacity>
      <Text className="mx-2 break-all text-[14px]">
        If You Agrred With Our Terms Please Check This Box.
      </Text>
    </View>
    <Pressable
    onPress={()=>{setLogin(true)}}
      onPressIn={() => {
        setbtnActive(true);
      }}
      onPressOut={() => {
        setbtnActive(false);
      }}>
      <Text
        disabled={btnDisable}
        className={`rounded-[1rem]  p-4 px-[2rem] text-[---wt] disabled:bg-[---d1]   ${btnActive ? 'bg-[---b1]' : 'bg-[---h1]'}`}>
        Login / Signup
      </Text>
    </Pressable>
  </View>
    
    
  );
};
const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxChecked: {},
  checkmark: {
    fontSize: 20,
  },
});

export default FirstPage;
