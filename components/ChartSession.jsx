import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChatSession = ({ setChat, setSetting, setMessage }) => {
  const [DropMenu, setDropMenu] = useState(false);
  const [SentAbleMessage, setSentAbleMessage] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [keyboardArea, setKeyboardArea] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState(false);
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-[99.9vw] flex-row items-center overflow-hidden bg-[---b1]">
          <Pressable
            className=""
            onPress={() => {
              setChat(false);
              setMessage(true);
              setSetting(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="ml-[-1.5rem] flex flex-row items-center">
            <Pressable className="flex flex-row items-center">
              <View className="mx-3 my-auto h-[7vh] w-[14vw] rounded-full bg-[---h1]"></View>
              <Text className="h-[5vh] w-[48vw] overflow-hidden py-2 text-[1.5rem] font-black text-white">
                Haifz Aubakar Afzal
              </Text>
            </Pressable>

            <Pressable>
              <IconMaterialIcon name="phone" size={30} color="white" className="m-2 shadow-lg" />
            </Pressable>
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
        </View>

        <View
          className={`absolute ${DropMenu ? 'right-0' : 'right-[-15rem]'} top-[3.5rem]  z-10 h-[40vh] w-[40vw] bg-[---h1] duration-[2s]`}>
          <Pressable>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconAnt name="user" size={40} color="white" className=" shadow-lg" />
              <Text className="ml-2 text-[18px] text-white">View</Text>
            </View>
          </Pressable>
          <Pressable>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconMaterialIcon name="block" size={40} color="white" className=" shadow-lg" />
              <Text className=" ml-2 text-[18px] text-white">Block</Text>
            </View>
          </Pressable>
          <Pressable>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconMaterialCommunity
                name="chat-remove"
                size={40}
                color="white"
                className=" shadow-lg"
              />
              <Text className="ml-2 text-[18px] text-white">Clear Chat</Text>
            </View>
          </Pressable>
          <Pressable>
            <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
              <IconAnt name="sharealt" size={40} color="white" className=" shadow-lg" />
              <Text className="ml-2 text-[18px] text-white">Share</Text>
            </View>
          </Pressable>
        </View>

        {/* ChatSession */}

        <SafeAreaView className={`${keyboardArea ? 'h-[50vh]' : 'h-[85vh]'}`}>
          <ScrollView className="flex flex-col">
            {/* ourMessage */}
            <View className="items-end">
              <View className="bg-[---msg] mx-3 my-2 pb-6  flex w-[70vw] flex-col rounded-[2rem] p-3 ">
                <Text className="text-[16px] text-white">
                  Hello There Its Abubakar. This is a text message from abubakar afzal. I hope you are doing well.
                </Text>
                <Text className="absolute right-[1rem] bottom-2 mx-[1rem]  text-[10px] text-white">
                  10:00 AM
                </Text>
              </View>
            </View><View className="items-start">
              <View className="bg-[---msg2] mx-3 my-2 pb-6  flex w-[70vw] flex-col rounded-[2rem] p-3 ">
                <Text className="text-[16px] text-white">
                  I know it's you. How are you? 
                </Text>
                <Text className="absolute right-[1rem] bottom-2 mx-[1rem]  text-[10px] text-white">
                  10:00 AM
                </Text>
              </View>
            </View>
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
export default ChatSession;
