import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { addToken, removeToken } from './redux/action';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const ProfileSession = ({ setProfilePage, setSettingPage }) => {
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  const [Name, setName] = useState(user.user_name);
  const [Email, setEmail] = useState(user.user_email);
  const [Phone, setPhone] = useState(user.user_phone);
  const [BD, setBD] = useState(user.user_date_of_birth);
  const [Bio, setBio] = useState(user.user_bio);
  const [Password, setPassword] = useState(user.user_password);
  const [Picture, setPicture] = useState(user.user_picture);
  const [SelectName, setSelectName] = useState(false);
  const [SelectEmail, setSelectEmail] = useState(false);
  const [SelectPhone, setSelectPhone] = useState(false);
  const [SelectBD, setSelectBD] = useState(false);
  const [SelectBio, setSelectBio] = useState(false);
  const [SelectPassword, setSelectPassword] = useState(false);
  const [SelectPicture, setSelectPicture] = useState(false);
  const dispatch = useDispatch();

  const uploadProfilePicture = async () => {
    console.log('Upload function called');
  
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'We need access to your photos!');
      return;
    }
  
    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    console.log('Picker result:', result);
  
    if (result.canceled) {
      console.log('User cancelled image picking');
      return;
    }
  
    const asset = result.assets[0];
  
    const formData = new FormData();
    formData.append('picture', {
      uri: asset.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    formData.append('email', user.user_email);
  
    try {
      const res = await axios.post(
        'http://192.168.0.107:3000/users/upload_picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Upload Response:', res.data);
  
      if (res.data.success) {
        const newPictureUrl = `http://192.168.0.107:3000${res.data.picture}`;
        setPicture(newPictureUrl);
        dispatch(removeToken());
        dispatch(addToken({ ...user, user_picture: newPictureUrl }));
        Alert.alert('Success', 'Profile picture updated');
      } else {
        Alert.alert('Error', 'Failed to update profile picture');
      }
    } catch (err) {
      console.error('Upload failed', err);
      Alert.alert('Upload Error', err.message || 'Something went wrong');
    }
  };
  

  const updateUser = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.107:3000/users/update_user',
        {
          user_name: Name,
          user_email: Email,
          user_date_of_birth: BD,
          user_phone: Phone,
          user_password: Password,
          user_bio: Bio || '', // optional fields
          user_picture: Picture || '', // optional fields
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;
      if (data.success) {
        const user = {
          user_name: Name,
          user_email: Email,
          user_date_of_birth: BD,
          user_phone: Phone,
          user_password: Password,
          user_bio: Bio || '',
          user_picture: Picture || '',
        };
  console.log(user)
        dispatch(removeToken())
        dispatch(addToken(user));
        Alert.alert('Success', 'Profile updated successfully');
        
      } else {
        Alert.alert('Error', 'Could not update user');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update user');
    }
  };

  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setSettingPage(true);
              setProfilePage(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
              Profile
            </Text>
          </View>
          <View></View>
        </View>

        {/* ProfileSession */}
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <View className="items-center">
            <ScrollView className="h-[90vh]">
              <View className="my-[0.5rem] flex h-[100vh] w-[90vw] flex-col items-center rounded-[1rem] bg-[---d1]">
              <View className="my-[1rem] ml-3 h-[30vh] w-[60vw] rounded-full bg-[---h1] overflow-hidden">
  {Picture ? (
    <Image
      source={{ uri: Picture }}
      style={{ width: '100%', height: '100%' }}
      resizeMode="cover"
    />
  ) : null}
  <Pressable
    onPress={() => {
      setSelectPicture(!SelectPicture);
      uploadProfilePicture()
    }}
    className="absolute right-10 bottom-5">
   
      <IconMaterialCommunity
        name="pencil-outline"
        size={30}
        color="white"
        className=" mx-2 my-auto shadow-lg"
      />

  </Pressable>
</View>

                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={SelectName}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    value={Name}
                    placeholder="Enter Your Name"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                    editable={SelectName}
                  />
                  <Pressable
                    onPress={() => {
                      setSelectName(!SelectName);
                    }}>
                    {SelectName ? (
                      <IconMaterialCommunity
                        name="check-bold"
                        size={30}
                        color="lightgreen"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    ) : (
                      <IconMaterialCommunity
                        name="pencil-outline"
                        size={30}
                        color="black"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    )}
                  </Pressable>
                </View>
                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={SelectBio}
                    onChangeText={(text) => {
                      setBio(text);
                    }}
                    value={Bio}
                    placeholder="Enter Your Bio"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                    editable={SelectBio}
                  />
                  <Pressable
                    onPress={() => {
                      setSelectBio(!SelectBio);
                    }}>
                    {SelectBio ? (
                      <IconMaterialCommunity
                        name="check-bold"
                        size={30}
                        color="lightgreen"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    ) : (
                      <IconMaterialCommunity
                        name="pencil-outline"
                        size={30}
                        color="black"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    )}
                  </Pressable>
                </View>
                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={SelectPassword}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    value={Password}
                    placeholder="Enter Your Password"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                    editable={SelectPassword}
                    secureTextEntry={true}
                  />
                  <Pressable
                    onPress={() => {
                      setSelectPassword(!SelectPassword);
                    }}>
                    {SelectPassword ? (
                      <IconMaterialCommunity
                        name="check-bold"
                        size={30}
                        color="lightgreen"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    ) : (
                      <IconMaterialCommunity
                        name="pencil-outline"
                        size={30}
                        color="black"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    )}
                  </Pressable>
                </View>
                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={true}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    value={Email}
                    placeholder="Enter Your Email"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border aria-disabled:border-[---d1]
                  "
                    editable={SelectEmail}
                    keyboardType="email-address"
                  />
                </View>
                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={SelectBD}
                    onChangeText={(text) => {
                      setBD(text);
                    }}
                    value={BD}
                    placeholder="Enter Your Date Of Birth"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                    editable={SelectBD}
                    keyboardType="numeric"
                  />
                  <Pressable
                    onPress={() => {
                      setSelectBD(!SelectBD);
                    }}>
                    {SelectBD ? (
                      <IconMaterialCommunity
                        name="check-bold"
                        size={30}
                        color="lightgreen"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    ) : (
                      <IconMaterialCommunity
                        name="pencil-outline"
                        size={30}
                        color="black"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    )}
                  </Pressable>
                </View>
                <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                  <TextInput
                    aria-disabled={SelectPhone}
                    onChangeText={(text) => {
                      setPhone(text);
                    }}
                    value={Phone}
                    placeholder="Enter Your Phone"
                    className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                    editable={SelectPhone}
                    keyboardType="phone-pad"
                  />
                  <Pressable
                    onPress={() => {
                      setSelectPhone(!SelectPhone);
                    }}>
                    {SelectPhone ? (
                      <IconMaterialCommunity
                        name="check-bold"
                        size={30}
                        color="lightgreen"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    ) : (
                      <IconMaterialCommunity
                        name="pencil-outline"
                        size={30}
                        color="black"
                        className=" mx-2 my-auto shadow-lg"
                      />
                    )}
                  </Pressable>
                </View>
                <Pressable onPress={updateUser}>
                  <Text className=" rounded-[1rem] bg-[---h1] p-4 px-[2rem] text-white">
                    Save Changes
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
export default ProfileSession;
