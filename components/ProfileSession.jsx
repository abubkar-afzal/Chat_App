import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ProfileSession = ({ setProfilePage, setSettingPage }) => {
  const [Name, setName] = useState('Hafiz Abubakar');
  const [Email, setEmail] = useState('hafizabubakar@gmial.com');
  const [Phone, setPhone] = useState('+923270972423');
  const [DB, setDB] = useState('10/07/2005');
  const [Bio, setBio] = useState('💻❤️');
  const [SelectName, setSelectName] = useState(false);
  const [SelectEmail, setSelectEmail] = useState(false);
  const [SelectPhone, setSelectPhone] = useState(false);
  const [SelectDB, setSelectDB] = useState(false);
  const [SelectBio, setSelectBio] = useState(false);
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
          
            <View className="my-[0.5rem] flex h-[90vh] w-[90vw] flex-col items-center rounded-[1rem] bg-[---d1]">
              <View className="my-[1rem] ml-3 h-[30vh] w-[60vw] rounded-full bg-[---h1]"></View>
              <View className="m-4 flex w-[70vw] flex-row justify-between overflow-hidden">
                <TextInput
                  aria-disabled={SelectName}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  value={Name}
                  placeholder="Enter Your Name"
                  className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                  caretHidden={true}
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
                  caretHidden={true}
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
                  aria-disabled={SelectEmail}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={Email}
                  placeholder="Enter Your Email"
                  className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                  caretHidden={true}
                  editable={SelectEmail}
                  keyboardType="email-address"
                />
                <Pressable
                  onPress={() => {
                    setSelectEmail(!SelectEmail);
                  }}>
                  {SelectEmail ? (
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
                  aria-disabled={SelectDB}
                  onChangeText={(text) => {
                    setDB(text);
                  }}
                  value={DB}
                  placeholder="Enter Your Date Of Birth"
                  className=" h-[3rem] w-[60vw] rounded-[1rem] px-[1rem] aria-disabled:border"
                  caretHidden={true}
                  editable={SelectDB}
                  keyboardType="name-phone-pad"
                />
                <Pressable
                  onPress={() => {
                    setSelectDB(!SelectDB);
                  }}>
                  {SelectDB ? (
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
                  caretHidden={true}
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
              <Pressable>
                <Text className=" rounded-[1rem] bg-[---h1] p-4 px-[2rem] text-white">
                  Save Changes
                </Text>
              </Pressable>
            </View>
          
        </View></KeyboardAwareScrollView>
      </View>
      
    </>
  );
};
export default ProfileSession;
