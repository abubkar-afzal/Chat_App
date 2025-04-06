import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageSession from './MessageSession';
import StatusSession from './StatusSession';
import CallsSession from './CallsSession';
import SettingSession from './SettingSession';
import ChatSession from './ChartSession';
import ContactSession from './ContactSession';
const HomePage = () => {
  const [Search, setSearch] = useState('');
  const [Message, setMessage] = useState(true);
  const [Status, setStatus] = useState(false);
  const [Call, setCall] = useState(false);
  const [Setting, setSetting] = useState(false);
  const [Chat, setChat] = useState(false);
  const [Contact, setContact] = useState(false);
  const [MessagePosition, setMessagePosition] = useState(null);
  const [StatusPosition, setStatusPosition] = useState(null);
  const [CallPosition, setCallPosition] = useState(null);
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const screenHeight = Dimensions.get('window').height;

    if (MessagePosition) {
      const { y, height } = MessagePosition;

      if (y < scrollY + screenHeight && y + height > scrollY) {
        setMessage(true);
      } else {
        setMessage(false);
      }
    }
    if (StatusPosition) {
      const { y, height } = StatusPosition;

      if (y < scrollY + screenHeight && y + height > scrollY) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
    if (CallPosition) {
      const { y, height } = CallPosition;

      if (y < scrollY + screenHeight && y + height > scrollY) {
        setCall(true);
      } else {
        setCall(false);
      }
    }
  };
  return (
    <>
      {Chat ? (
        <ChatSession setChat={setChat} setMessage={setMessage} setSetting={setSetting} />
      ) : Contact ? (
        <ContactSession setContact={setContact} setMessage={setMessage} setSetting={setSetting} setChat={setChat}/>
      ) : (
        <>
          {Setting ? (
            <SettingSession setSetting={setSetting} />
          ) : (
            <View className="mt-[2.8rem] ">
              {/* topBar */}
              <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
                <View className="h-[8vh] bg-[---h1]">
                  <View className="absolute left-[-3.9rem] top-[-5.1rem] h-[10rem] w-[10rem] items-end rounded-[30rem] bg-[---h1]">
                    <SafeAreaView className="right-[2rem] mt-[5rem] h-[4rem]">
                      <ScrollView
                        className="flex flex-col "
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}>
                        <View
                          className="my-[1rem]"
                          onLayout={(event) => {
                            const { y, height } = event.nativeEvent.layout;
                            setMessagePosition({ y, height });
                          }}>
                          <Icon name="message" size={30} color="white" className=" shadow-lg" />
                        </View>
                        <View
                          className="my-[1rem]"
                          onLayout={(event) => {
                            const { y, height } = event.nativeEvent.layout;
                            setStatusPosition({ y, height });
                          }}>
                          <Icon name="images" size={30} color="white" className=" shadow-lg" />
                        </View>
                        <View
                          className="my-[1rem]"
                          onLayout={(event) => {
                            const { y, height } = event.nativeEvent.layout;
                            setCallPosition({ y, height });
                          }}>
                          <Icon name="phone" size={30} color="white" className=" shadow-lg" />
                        </View>
                      </ScrollView>
                    </SafeAreaView>
                  </View>
                </View>
                <View className=" h-[8vh]">
                  <View className="left-[3rem] mt-[10px] flex h-[5vh] flex-row items-center shadow-lg">
                    <TextInput
                      onChangeText={(text) => {
                        setSearch(text);
                      }}
                      value={Search}
                      placeholder="Search"
                      className=" h-[3rem] w-[8rem] rounded-[1rem]  border border-[---wt] px-[1rem] text-[---wt]  placeholder:text-[---wt] "
                      caretHidden={true}
                    />
                    <Pressable>
                      <IconAnt name="search1" size={25} color="white" className="mx-2 shadow-lg" />
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  className="h-[8vh]"
                  onPress={() => {
                    setSetting(true);
                  }}>
                  <IconFeature name="settings" size={30} color="white" className="m-4 shadow-lg" />
                </Pressable>
              </View>

              {Message ? (
                <MessageSession setChat={setChat} setContact={setContact} setMessage={setMessage} />
              ) : Status ? (
                <StatusSession />
              ) : Call ? (
                <CallsSession />
              ) : null}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
