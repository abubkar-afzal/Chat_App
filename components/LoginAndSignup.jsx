import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './HomePage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToken } from './redux/action';

const LoginAndSignUp = () => {
  const [Name, setName] = useState('');
  const [ChangeName, setChangeName] = useState(false);
  const [BD, setBD] = useState('');
  const [ChangeBD, setChangeBD] = useState(false);
  const [Password, setPassword] = useState('');
  const [ChangePassword, setChangePassword] = useState(false);
  const [HidePassword, setHidePassword] = useState(true);
  const [Email, setEmail] = useState('');
  const [ChangeEmail, setChangeEmail] = useState(false);
  const [Phone, setPhone] = useState('');
  const [ChangePhone, setChangePhone] = useState(false);
  const [Login, setLogin] = useState(true);
  const [SignUp, setSignUp] = useState(false);
  const [Forgot, setForgot] = useState(false);
  const [Home, setHome] = useState(false);

  const [LoginButtonActive, setLoginButtonActive] = useState(false);
  const [LoginButtonDisable, setLoginButtonDisable] = useState(true);
  useEffect(() => {
    if (Email.length >= 10 && Email.includes('@gmail.com') && Password.length >= 4) {
      setLoginButtonDisable(false);
    } else {
      setLoginButtonDisable(true);
    }
  }, [Email, Password]);
  const [SignUpButtonActive, setSignUpButtonActive] = useState(false);
  const [SignUpButtonDisable, setSignUpButtonDisable] = useState(true);
  useEffect(() => {
    if (
      Email.length >= 10 &&
      Email.includes('@gmail.com') &&
      Password.length >= 4 &&
      Name.length >= 4 &&
      Phone.length >= 10 &&
      BD.length >= 4
    ) {
      setSignUpButtonDisable(false);
    } else {
      setSignUpButtonDisable(true);
    }
  }, [Email, Password, Name, Phone, BD]);

  const dispatch = useDispatch();

  const addUser = async () => {
    try {
      const response = await axios.post('http://192.168.0.107:3000/users', {
        user_name: Name,
        user_email: Email,
        user_date_of_birth: BD,
        user_phone: Phone,
        user_password: Password,
      }, {
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const { data } = response;
      if (data.success) {
      const user ={
        user_name: Name,
        user_email: Email,
        user_date_of_birth: BD,
        user_phone: Phone,
        user_password: Password,
      };
      dispatch(addToken(user));
      Alert.alert('Welcome', `${Name}`);
      setName('');
      setEmail('');
      setBD('');
      setPhone('');
      setPassword('');
      setHome(true);}
      else{
        Alert.alert('Error', 'User already exists');
        setSignUp(false), setLogin(true), setForgot(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add user');
      setHome(false);
    }
  };
  const getUser = async () => {
    if (!Email) {
      Alert.alert('Error', 'Email is required');
      return;
    }
  
    const url = `http://192.168.0.107:3000/users/email/${encodeURIComponent(Email)}`;
    console.log("🚀 Requesting user with URL:", url);
  
    try {
      const response = await axios.get(url);
      const { data } = response;
  
      if (data.success) {
        const user = {
          user_name: data.token.user_name,
          user_email: data.token.user_email,
          user_date_of_birth: data.token.user_date_of_birth,
          user_phone: data.token.user_phone,
          user_password: data.token.user_password,
        };
  
        dispatch(addToken(user));
        Alert.alert('Welcome', `${data.token.user_name}`);
  
        setName('');
        setEmail('');
        setBD('');
        setPhone('');
        setPassword('');
        setHome(true);
      } else {
        Alert.alert('Error', 'User does not exist');
        setSignUp(true);
        setLogin(false);
        setForgot(false);
      }
    } catch (error) {
      console.error("❌ Axios error:", error);
      Alert.alert('Error', 'Failed to get user');
      setHome(false);
    }
  };
  
  return (
    <>
      {Home ? (
        <HomePage setHome={setHome}/>
      ) : (
        <View className="my-auto items-center ">
          {/* Login */}
          {Login ? (
            <View className="items-center">
              <View>
                <Text className="fixed top-[-8rem] text-[1.5rem] font-extrabold">
                  Pigeon Message 🕊️
                </Text>
              </View>
              <Text className="my-[1rem] text-[20px] font-black">Login</Text>
              <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                <Text
                  className={`${ChangeEmail ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                  Email
                </Text>
                <TextInput
                  onFocus={() => {
                    setChangeEmail(true), setChangePassword(false);
                  }}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={Email}
                  placeholder="Enter Your Email"
                  className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem]"
                />
              </View>
              <View className="my-[1rem] w-[70vw] overflow-x-hidden">
                <Text
                  className={`${ChangePassword ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                  Password
                </Text>
                <View className="flex flex-row items-center">
                  <TextInput
                    onFocus={() => {
                      setChangeEmail(false), setChangePassword(true);
                    }}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    value={Password}
                    secureTextEntry={HidePassword}
                    placeholder="Enter Your Password"
                    className="h-[4rem] w-[60vw] rounded-[1rem] border px-[1rem]"
                  />
                  <TouchableOpacity onPress={() => setHidePassword(!HidePassword)} className="mx-2">
                    <Icon name={HidePassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Pressable
                  onPressIn={() => {
                    setLoginButtonActive(true);
                  }}
                  onPressOut={() => {
                    setLoginButtonActive(false);
                  }}>
                  <Text
                    onPress={getUser}
                    disabled={LoginButtonDisable}
                    className={` my-[1rem] rounded-[1rem] p-4 px-[2rem] text-white ${LoginButtonActive ? 'bg-[---b1]' : 'bg-[---h1]'} disabled:bg-[---d1]`}>
                    Login
                  </Text>
                </Pressable>
              </View>
              <View className="items-center">
                <Text className="my-[1rem]">
                  If You Don't Have Any Account ?
                  <Pressable
                    onPress={() => {
                      setSignUp(true), setLogin(false), setForgot(false);
                    }}
                    className="mt-2">
                    <Text className="text-[---h1] underline"> SignUp</Text>
                  </Pressable>
                </Text>
                <Pressable
                  onPress={() => {
                    setSignUp(false), setLogin(false), setForgot(true);
                  }}
                  className="mt-2">
                  <Text className="text-[---h1] underline">Forgot Password ?</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {/* Signup */}
          {SignUp ? (
            <View className="items-center">
              <View>
                <Text className="fixed top-[-2rem] text-[1.5rem] font-extrabold">
                  Pigeon Message 🕊️
                </Text>
              </View>
              <Text className="mb-[1rem] text-[20px] font-black">Create New Account</Text>
              <SafeAreaView className="h-[50vh]">
                <ScrollView className="flex flex-col ">
                  <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                    <Text
                      className={`${ChangeName ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  px-1 shadow-sm`}>
                      Name
                    </Text>
                    <TextInput
                      onFocus={() => {
                        setChangeEmail(false),
                          setChangePhone(false),
                          setChangePassword(false),
                          setChangeName(true),
                          setChangeBD(false);
                      }}
                      onChangeText={(text) => {
                        setName(text);
                      }}
                      value={Name}
                      placeholder="Enter Your Name"
                      className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem]"
                    />
                  </View>
                  <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                    <Text
                      className={`${ChangeBD ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                      Date Of Birth
                    </Text>
                    <TextInput
                      onFocus={() => {
                        setChangeEmail(false),
                          setChangePhone(false),
                          setChangePassword(false),
                          setChangeName(false),
                          setChangeBD(true);
                      }}
                      onChangeText={(text) => {
                        setBD(text);
                      }}
                      value={BD}
                      placeholder="Enter Your Date Of Birth"
                      className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem]"
                      keyboardType="numeric"
                    />
                  </View>
                  <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                    <Text
                      className={`${ChangePhone ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                      Phone
                    </Text>
                    <TextInput
                      onFocus={() => {
                        setChangeEmail(false),
                          setChangePhone(true),
                          setChangePassword(false),
                          setChangeName(false),
                          setChangeBD(false);
                      }}
                      onChangeText={(text) => {
                        setPhone(text);
                      }}
                      value={Phone}
                      placeholder="Enter Your Phone"
                      className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem] "
                      keyboardType="numeric"
                    />
                  </View>
                  <View className="my-[1rem] w-[70vw] overflow-x-hidden">
                    <Text
                      className={`${ChangePassword ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                      Password
                    </Text>
                    <View className="flex flex-row items-center">
                      <TextInput
                        onFocus={() => {
                          setChangeEmail(false),
                            setChangePhone(false),
                            setChangePassword(true),
                            setChangeName(false),
                            setChangeBD(false);
                        }}
                        onChangeText={(text) => {
                          setPassword(text);
                        }}
                        value={Password}
                        secureTextEntry={HidePassword}
                        placeholder="Enter Your Password"
                        className="h-[4rem] w-[60vw] rounded-[1rem] border px-[1rem]"
                      />
                      <TouchableOpacity
                        onPress={() => setHidePassword(!HidePassword)}
                        className="mx-2">
                        <Icon name={HidePassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                      </TouchableOpacity>
                    </View>
                    <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                      <Text
                        className={`${ChangeEmail ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                        Email
                      </Text>
                      <TextInput
                        onFocus={() => {
                          setChangeEmail(true),
                            setChangePhone(false),
                            setChangePassword(false),
                            setChangeName(false),
                            setChangeBD(false);
                        }}
                        onChangeText={(text) => {
                          setEmail(text);
                        }}
                        value={Email}
                        placeholder="Enter Your Email"
                        className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem]"
                      />
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <View>
                <Pressable
                  onPressIn={() => {
                    setSignUpButtonActive(true);
                  }}
                  onPressOut={() => {
                    setSignUpButtonActive(false);
                  }}>
                  <Text
                    onPress={addUser}
                    disabled={SignUpButtonDisable}
                    className={` my-[1rem] rounded-[1rem] p-4 px-[2rem] text-white ${SignUpButtonActive ? 'bg-[---b1]' : 'bg-[---h1]'} disabled:bg-[---d1]`}>
                    SignUp
                  </Text>
                </Pressable>
              </View>
              <View className="">
                <Text className="my-[1rem] flex flex-row items-baseline ">
                  Do You Have Already Account ?
                  <Pressable
                    onPress={() => {
                      setSignUp(false), setLogin(true), setForgot(false);
                    }}
                    className="mt-2">
                    <Text className="text-center text-[---h1] underline"> Login</Text>
                  </Pressable>
                </Text>
              </View>
            </View>
          ) : null}

          {/* Forgot */}
          {Forgot ? (
            <View className="items-center">
              <View>
                <Text className="fixed top-[-12rem] text-[1.5rem] font-extrabold">
                  Pigeon Message 🕊️
                </Text>
              </View>
              <Text className="mb-[1rem] text-[20px] font-black">Forgot Password</Text>

              <View className="my-[1rem] w-[70vw] overflow-x-hidden  ">
                <Text
                  className={`${ChangeEmail ? 'block' : 'hidden'} absolute left-5 top-[-10px] z-10 rounded-[2rem] bg-[---wt]  shadow-sm`}>
                  Email
                </Text>
                <TextInput
                  onFocus={() => {
                    setChangeEmail(true),
                      setChangePhone(false),
                      setChangePassword(false),
                      setChangeName(false),
                      setChangeBD(false);
                  }}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={Email}
                  placeholder="Enter Your Email"
                  className="h-[4rem] w-[70vw] rounded-[1rem] border px-[1rem]"
                />
              </View>

              <View>
                <Pressable
                  onPressIn={() => {
                    setSignUpButtonActive(true);
                  }}
                  onPressOut={() => {
                    setSignUpButtonActive(false);
                  }}>
                  <Text
                    disabled={SignUpButtonDisable}
                    className={` my-[1rem] rounded-[1rem] p-4 px-[2rem] text-white ${SignUpButtonActive ? 'bg-[---b1]' : 'bg-[---h1]'} disabled:bg-[---d1]`}>
                    Request
                  </Text>
                </Pressable>
              </View>
              <View className="">
                <Text className="my-[1rem] flex flex-row items-baseline ">
                  Go Back To
                  <Pressable
                    onPress={() => {
                      setSignUp(false), setLogin(true), setForgot(false);
                    }}
                    className="mt-2">
                    <Text className="text-center text-[---h1] underline"> Login</Text>
                  </Pressable>
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </>
  );
};
export default LoginAndSignUp;
