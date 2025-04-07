import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

const StatusViewSession = ({ setStatusView, setStatus, setViewProfile, setChat }) => {
  const [DropMenu, setDropMenu] = useState(false);
 const [SentAbleMessage, setSentAbleMessage] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [keyboardArea, setKeyboardArea] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState(false);
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setStatusView(false);
              setStatus(true);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="ml-[-1.5rem] flex flex-row items-center">
            <Pressable
              onPress={() => {
                setViewProfile(true);
                setStatusView(false);
                setChat(true);
              }}
              className="flex flex-row items-center">
              <View className="mx-3 my-auto h-[7vh] w-[14vw] rounded-full bg-[---h1]"></View>
              <Text className="h-[5vh] w-[48vw] overflow-hidden py-2 text-[1.5rem] font-black text-white">
                Haifz Aubakar Afzal
              </Text>
            </Pressable>

            <View className="h-[10vw] w-[10vw] "></View>
            <Pressable
              onPress={() => {
                setDropMenu(!DropMenu);
              }}>
              {DropMenu ? (
                <IconFeature name="x" size={30} color="white" className="shadow-lg " />
              ) : (
                <IconMaterialCommunity
                  name="dots-vertical"
                  size={30}
                  color="white"
                  className=" shadow-lg"
                />
              )}
            </Pressable>
          </View>
          <View></View>
        </View>
        <View
          className={`absolute ${DropMenu ? 'right-0' : 'right-[-15rem]'} top-[3.5rem]  z-10 h-[10vh] w-[40vw] bg-[---h1] duration-[2s]`}>
          <Pressable
            onPress={() => {
              setViewProfile(true);
            }}>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconAnt name="pause" size={25} color="white" className=" shadow-lg" />
              <Text className="ml-2 text-[18px] text-white">Pause</Text>
            </View>
          </Pressable>
          <Pressable>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconMaterialCommunity
                name="volume-mute"
                size={25}
                color="white"
                className=" shadow-lg"
              />
              <Text className=" ml-2 text-[18px] text-white">Mute</Text>
            </View>
          </Pressable>
        </View>
        {/* StatusViewSession */}
        <SafeAreaView className={`${keyboardArea ? 'h-[50vh]' : 'h-[85vh]'}`}>
                <ScrollView className="flex flex-col">
                  {/* ourStatus */}
                  
                </ScrollView>
              </SafeAreaView>
        
              <View
                className={`absoulte ${keyboardArea ? 'h-[50vh] bg-[---messageInput]' : null} w-full `}>
                <View className="flex h-[7vh] w-full flex-row items-center">
                  <Pressable className="mx-2 flex w-[80vw]  flex-row items-center  rounded-[1rem] border border-black bg-[---messageInput]">
                    <Pressable onPress={() => setPickerVisible(!isPickerVisible)}>
                      <IconMaterialIcon
                        name="emoji-emotions"
                        size={25}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </Pressable>
                    <TextInput
                      onFocus={() => setKeyboardArea(true)}
                      onBlur={() => setKeyboardArea(false)}
                      multiline={true}
                      onChangeText={(text) => {
                        setSentAbleMessage(text);
                      }}
                      value={SentAbleMessage}
                      placeholder="Enter Your Text"
                      className="  h-[3rem] w-[45vw]  overflow-scroll  "
                    />
                    <Pressable
                      onPress={() => {
                        keyboardArea && widgetLayout
                          ? (setKeyboardArea(false), setWidgetLayout(false))
                          : (setKeyboardArea(true), setWidgetLayout(true));
                      }}>
                      <IconAnt name="paperclip" size={25} color="black" className="mx-2 shadow-lg" />
                    </Pressable>
                    <Pressable>
                      <IconAnt name="camera" size={25} color="black" className=" shadow-lg" />
                    </Pressable>
                  </Pressable>
                  {SentAbleMessage.length > 0 ? (
                    <Pressable className="">
                      <IconEntypo
                        name="paper-plane"
                        size={40}
                        color="white"
                        className="h-[3rem] w-[3rem] rounded-full bg-[---sent] p-2 shadow-lg"
                      />
                    </Pressable>
                  ) : (
                    <Pressable className="h-[3rem] w-[3rem] items-center rounded-full  bg-[---sent] shadow-lg">
                      <IconAwesome name="microphone" size={25} color="white" className=" p-2 " />
                    </Pressable>
                  )}
                </View>
                {widgetLayout ? (
                  <View className="flex h-[43vh] w-full flex-row flex-wrap bg-[---widgetLayout] ">
                    <Pressable className="mx-[1rem] my-[1rem] h-[10vh] w-[40vw] items-center rounded-[1rem] border bg-white">
                      <IconAnt name="picture" size={40} className="mt-2 shadow-lg" />
                      <Text className="text-[18px]">Gallery</Text>
                    </Pressable>
                    <Pressable className="mx-[1rem] my-[1rem] h-[10vh] w-[40vw] items-center rounded-[1rem] border bg-white">
                      <IconAnt name="user" size={40} className="mt-2 shadow-lg" />
                      <Text className="text-[18px]">Contact</Text>
                    </Pressable>
                    <Pressable className=" mx-[1rem] my-[1rem] h-[10vh] w-[40vw] items-center rounded-[1rem] border bg-white">
                      <IconMaterialCommunity
                        name="file-document-multiple-outline"
                        size={40}
                        className="mt-2 shadow-lg"
                      />
                      <Text className="text-[18px]">Document</Text>
                    </Pressable>
                    <Pressable className="mx-[1rem] my-[1rem] h-[10vh] w-[40vw] items-center rounded-[1rem] border bg-white">
                      <IconEntypo name="location-pin" size={40} className="mt-2 shadow-lg" />
                      <Text className="text-[18px]">Location</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
      </View>
    </>
  );
};
export default StatusViewSession;
