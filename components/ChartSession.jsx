import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ViewProfileSession from './ViewProfileSession';
import axios from 'axios';
import { useSelector } from 'react-redux';
const ChatSession = ({
  setChat,
  setSetting,
  setMessage,
  setViewProfile,
  ViewProfile,
  OtherUserDetails,
  setCameraOpen,
}) => {
  const [DropMenu, setDropMenu] = useState(false);
  const [SentAbleMessage, setSentAbleMessage] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [keyboardArea, setKeyboardArea] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState(false);
  const data = useSelector((state) => state.reducer);
  const [user] = data;

  const [Messages, setMessages] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      getChat();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getChat = async () => {
    const url = `http://192.168.0.100:3000/users/messages/person/${encodeURIComponent(user.user_email)}/${encodeURIComponent(OtherUserDetails.reciver_email)}`;

    try {
      const response = await axios.get(url);
      const { data } = response;

      if (data.success) {
        setMessages(data.messages);
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    } catch (error) {}
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.100:3000/users/send_message',
        {
          user_name: user.user_name,
          user_email: user.user_email,
          user_phone: user.user_phone,
          message: SentAbleMessage,
          message_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          reciver_name: OtherUserDetails.reciver_name,
          reciver_email: OtherUserDetails.reciver_email,
          reciver_phone: OtherUserDetails.reciver_phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { data } = response;
      if (data.success) {
      } else {
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    }
  };
  return (
    <>
      {ViewProfile ? (
        <ViewProfileSession
          setViewProfile={setViewProfile}
          setChat={setChat}
          OtherUserDetails={OtherUserDetails}
        />
      ) : (
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
              <IconMaterialIcon
                name="arrow-back"
                size={30}
                color="white"
                className="m-4 shadow-lg"
              />
            </Pressable>
            <View className="ml-[-1.5rem] flex flex-row items-center">
              <Pressable
                onPress={() => {
                  setViewProfile(true);
                }}
                className="flex flex-row items-center">
                <View className="mx-3 my-auto h-[7vh] w-[14vw] rounded-full bg-[---h1]"></View>
                <Text className="h-[5vh] w-[48vw] overflow-hidden py-2 text-[1.5rem] font-black text-white">
                  {OtherUserDetails.reciver_name}
                </Text>
              </Pressable>

              <Pressable>
                <IconMaterialIcon
                  name="add-call"
                  size={30}
                  color="white"
                  className="m-2 shadow-lg"
                />
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
            className={`absolute ${DropMenu ? 'right-0' : 'right-[-15rem]'} top-[3.5rem]  z-10 h-[30vh] w-[40vw] bg-[---h1] duration-[2s]`}>
            <Pressable
              onPress={() => {
                setViewProfile(true);
              }}>
              <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
                <IconAnt name="user" size={25} color="white" className=" shadow-lg" />
                <Text className="ml-2 text-[18px] text-white">View</Text>
              </View>
            </Pressable>
            <Pressable>
              <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
                <IconMaterialIcon name="block" size={25} color="white" className=" shadow-lg" />
                <Text className=" ml-2 text-[18px] text-white">Block</Text>
              </View>
            </Pressable>
            <Pressable>
              <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
                <IconMaterialCommunity
                  name="chat-remove"
                  size={25}
                  color="white"
                  className=" shadow-lg"
                />
                <Text className="ml-2 text-[18px] text-white">Clear Chat</Text>
              </View>
            </Pressable>
            <Pressable>
              <View className="my-2 flex h-auto w-full flex-row items-center bg-[---m1] p-2">
                <IconAnt name="sharealt" size={25} color="white" className=" shadow-lg" />
                <Text className="ml-2 text-[18px] text-white">Share</Text>
              </View>
            </Pressable>
          </View>

          {/* ChatSession */}

          <SafeAreaView className={`${keyboardArea ? 'h-[50vh]' : 'h-[85vh]'}`}>
            <ScrollView className="flex flex-col">
              {/* ourMessage */}
              {Messages.map((item) => {
                return user.user_name == item.user_name ? (
                  <View key={item.message_id} className="items-end pl-[30vw]">
                    <View className=" flex flex-row items-center ">
                      <View className=" my-2 flex  min-w-[25vw]   flex-col rounded-[2rem] bg-[---msg] p-3 pb-6 ">
                        <Text className="text-[16px] text-white">{item.message}</Text>
                        <Text className="absolute bottom-2 right-[1rem] mx-[1rem]  text-[10px] text-white">
                          {formatTime(item.message_time)}
                        </Text>
                      </View>
                      <View className="mx-[5px] h-[2rem] w-[2rem] rounded-[2rem] bg-[---b1]"></View>
                    </View>
                  </View>
                ) : (
                  <View key={item.message_id} className="items-start pr-[30vw]">
                    <View className="flex flex-row items-center">
                      <View className="mx-[5px] h-[2rem] w-[2rem] rounded-[2rem] bg-[---b1]"></View>
                      <View className=" my-2 flex  min-w-[25vw]   flex-col rounded-[2rem] bg-[---msg2] p-3 pb-6 ">
                        <Text className="text-[16px] text-white"> {item.message}</Text>
                        <Text className="absolute bottom-2 right-[1rem] mx-[1rem]  text-[10px] text-white">
                          {formatTime(item.message_time)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
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
                <Pressable
                  onPress={() => {
                    setCameraOpen(true);
                  }}>
                  <IconAnt name="camera" size={25} color="black" className=" shadow-lg" />
                </Pressable>
              </Pressable>
              {SentAbleMessage.length > 0 ? (
                <Pressable
                  className=""
                  onPress={() => {
                    sendMessage();
                    setSentAbleMessage('');
                  }}>
                  <IconEntypo
                    name="paper-plane"
                    size={25}
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
      )}
    </>
  );
};
export default ChatSession;
