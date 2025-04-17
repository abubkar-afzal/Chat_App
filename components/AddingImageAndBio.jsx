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
import HomePage from './HomePage';

const AddingImageAndBio = ({ Home, setHome }) => {
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  const [Name, setName] = useState(user.user_name);
  const [Email, setEmail] = useState(user.user_email);
  const [Phone, setPhone] = useState(user.user_phone);
  const [BD, setBD] = useState(user.user_date_of_birth);
  const [Bio, setBio] = useState(user.user_bio);
  const [Password, setPassword] = useState(user.user_password);
  const [Picture, setPicture] = useState(user.user_picture);
  const [SelectBio, setSelectBio] = useState(false);
  const [SelectPicture, setSelectPicture] = useState(false);
  const [Finish, setFinish] = useState(true);
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
    formData.append('email',Email);

    try {
      const res = await axios.post('http://192.168.0.107:3000/users/upload_picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload Response:', res.data);

      if (res.data.success) {
        const newPictureUrl = `http://192.168.0.107:3000${res.data.picture}`;
        setPicture(newPictureUrl);
        dispatch(removeToken());
        dispatch(addToken({ ...user, user_picture: newPictureUrl }));
      } else {
        Alert.alert('Error', 'Failed to add profile picture');
      }
    } catch (err) {
      console.error('Upload failed', err);
      Alert.alert('Upload Error', err.message || 'Something went wrong');
    }
  };

  const updateBio = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.107:3000/users/upload_bio',
        {
          user_email: Email,
          user_bio: Bio || '',
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
        console.log(user);
        dispatch(removeToken());
        dispatch(addToken(user));
       
      } else {
        Alert.alert('Error', 'Could not Bio ');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to Add ');
    }
  };
  return (
    <>{
      Home ? 
        <HomePage setHome={setHome} /> :
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <View></View>
          <View className="items-center text-center">
            <Text className="ml-[2rem]  mt-[10px] text-[1.5rem] font-black text-white">
              Add Profile Picture And Bio.
            </Text>
          </View>
          <View></View>
        </View>

        {/* AddingImageAndBio */}
          <View className="items-center">
              <View className="my-[0.5rem] flex py-[2rem] w-[90vw] flex-col items-center rounded-[1rem] bg-[---d1]">
                <View className="my-[1rem] ml-3 h-[30vh] w-[60vw] overflow-hidden rounded-full bg-[---h1]">
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
                      uploadProfilePicture();
                    }}
                    className="absolute bottom-5 right-10">
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
                      <Pressable
                        onPress={() => {
                          setFinish(false), updateBio(),setSelectBio(!SelectBio);
                        }}>
                        <IconMaterialCommunity
                          name="check-bold"
                          size={30}
                          color="lightgreen"
                          className=" mx-2 my-auto shadow-lg"
                        />
                      </Pressable>
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

                <Pressable onPress={() => {setHome(true)}} disabled={Finish}>
                  <Text disabled={Finish} className="disabled:bg-[---d1] rounded-[1rem] bg-[---h1] p-4 px-[2rem] text-white ">
                    Done 
                  </Text>
                </Pressable>
                    <View className='w-[2rem] h-[2rem]'></View>
              </View>
          </View>
      </View>}
    </>
  );
};
export default AddingImageAndBio;
