import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, Image } from 'react-native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { addToken, removeToken } from './redux/action';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Buffer } from 'buffer';

const ProfileSession = ({ setProfilePage, setSettingPage }) => {
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  const [Name, setName] = useState(user.user_name);
  const [Email, setEmail] = useState(user.user_email);
  const [Phone, setPhone] = useState(user.user_phone);
  const [BD, setBD] = useState(user.user_date_of_birth);
  const [Bio, setBio] = useState(user.user_bio);
  const [Password, setPassword] = useState('');
  const [Picture, setPicture] = useState(user.user_picture);
  const [SelectName, setSelectName] = useState(false);
  const [SelectEmail, setSelectEmail] = useState(false);
  const [SelectPhone, setSelectPhone] = useState(false);
  const [SelectBD, setSelectBD] = useState(false);
  const [SelectBio, setSelectBio] = useState(false);
  const [SelectPassword, setSelectPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = async () => {
    try {
      const res = await axios.get('http://192.168.0.100:3000/users/get_picture', {
        params: { email: Email },
        responseType: 'arraybuffer',
      });

      const mimeType = res.headers['content-type'];
      const base64Image = `data:${mimeType};base64,${Buffer.from(res.data, 'binary').toString('base64')}`;

      setPicture(base64Image);
      dispatch(removeToken());
      dispatch(addToken({ ...user, user_picture: base64Image }));
    } catch (err) {
      console.error('Failed to fetch profile picture:', err);
    }
  };

  const uploadProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permission to access media library is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (pickerResult.canceled || !pickerResult.assets?.length) {
        console.log('No image selected.');
        return;
      }

      const asset = pickerResult.assets[0];
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 500 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      const res = await axios.post(
        'http://192.168.0.100:3000/users/upload_picture',
        {
          email: Email,
          image: manipulatedImage.base64,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        fetchProfilePicture(); // Refresh picture from DB
        Alert.alert('Success', 'Profile picture uploaded!');
      } else {
        Alert.alert('Upload Error', res.data.message || 'Failed to upload.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', error.message || 'Something went wrong.');
    }
  };

  const updateUser = async () => {
    try {
      const payload = {
        user_name: Name,
        user_email: Email,
        user_date_of_birth: BD,
        user_phone: Phone,
        user_bio: Bio || '',
        user_picture: Picture || '',
      };

      if (SelectPassword && Password) {
        payload.user_password = Password;
      }

      const response = await axios.post('http://192.168.0.100:3000/users/update_user', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = response;
      if (data.success) {
        const updatedUser = {
          ...payload,
          user_password: Password || user.user_password,
        };

        dispatch(removeToken());
        dispatch(addToken(updatedUser));
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
      <View className="mt-[2.8rem]">
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

        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <View className="items-center">
            <ScrollView className="h-[90vh]">
              <View className="my-[0.5rem] flex h-[100vh] w-[90vw] flex-col items-center rounded-[1rem] bg-[---d1]">
                <View className="my-[1rem] ml-3 h-[30vh] w-[60vw] rounded-full bg-[---h1] overflow-hidden items-center justify-center">
                  <Image
                    source={
                      Picture
                        ? { uri: Picture }
                        : require('assets/default-profile.png') // Replace with actual default path
                    }
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                  <Pressable onPress={uploadProfilePicture} className="absolute right-10 bottom-5">
                    <IconMaterialCommunity
                      name="pencil-outline"
                      size={30}
                      color="white"
                      className="mx-2 my-auto shadow-lg"
                    />
                  </Pressable>
                </View>

                <FieldInput label="Name" value={Name} onChange={setName} editable={SelectName} toggleEdit={() => setSelectName(!SelectName)} />
                <FieldInput label="Bio" value={Bio} onChange={setBio} editable={SelectBio} toggleEdit={() => setSelectBio(!SelectBio)} />
                <FieldInput label="Password" value={Password} onChange={setPassword} editable={SelectPassword} toggleEdit={() => setSelectPassword(!SelectPassword)} secure />
                <FieldInput label="Email" value={Email} editable={false} />
                <FieldInput label="Date of Birth" value={BD} onChange={setBD} editable={SelectBD} toggleEdit={() => setSelectBD(!SelectBD)} />
                <FieldInput label="Phone" value={Phone} onChange={setPhone} editable={SelectPhone} toggleEdit={() => setSelectPhone(!SelectPhone)} />

                <Pressable onPress={updateUser}>
                  <Text className="rounded-[1rem] bg-[---h1] p-4 px-[2rem] text-white">
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

const FieldInput = ({ label, value, onChange, editable = false, toggleEdit, secure = false }) => (
  <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
    <TextInput
      onChangeText={onChange}
      value={value}
      placeholder={`Enter Your ${label}`}
      className="h-[3rem] w-[60vw] rounded-[1rem] px-[1rem]"
      editable={editable}
      secureTextEntry={secure}
      keyboardType={label === 'Phone' ? 'phone-pad' : label === 'Date of Birth' ? 'numeric' : 'default'}
    />
    {toggleEdit && (
      <Pressable onPress={toggleEdit}>
        <IconMaterialCommunity
          name={editable ? 'check-bold' : 'pencil-outline'}
          size={30}
          color={editable ? 'lightgreen' : 'black'}
          className="mx-2 my-auto shadow-lg"
        />
      </Pressable>
    )}
  </View>
);

export default ProfileSession;
