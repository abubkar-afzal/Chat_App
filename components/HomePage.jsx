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
const HomePage = () => {
  const [Search, setSearch] = useState('');
  const [Message, setMessage] = useState(true);
  const [Status, setStatus] = useState(false);
  const [Call, setCall] = useState(false);

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
          <View className="h-[8vh]">
            <IconFeature name="settings" size={30} color="white" className="m-4 shadow-lg" />
          </View>
        </View>

        {/* messageSession */}
        {Message ? (
          <>
            <SafeAreaView className="mb-[2rem]">
              <ScrollView
                className="flex flex-col "
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View className=" items-center">
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                      </Text>
                    </View>
                    <View className="flex h-[10vh] flex-col">
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                      <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
            {/* PlusButton */}
            <View className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
              <IconAnt
                name="pluscircle"
                size={45}
                color="#1c59dfee"
                className="m-7 rounded-full bg-[---wt]  shadow-lg"
              />
            </View>
          </>
        ) : null}

        {/* StatusSession */}
        {Status ? (
          <>
            
            <View className="items-center">
              <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                <View className="mx-2 w-[60vw] overflow-hidden">
                  <Text className="mt-[10px] h-[25px] text-[18px] font-bold">My Status</Text>
                  <Text className="my-[10px] h-[20px] text-[14px]">Today, 10:00 AM</Text>
                </View>
                <View className="">
                  <IconMaterialCommunity
                    name="menu"
                    size={30}
                    color="black"
                    className=" mx-2 shadow-lg"
                  />
                </View>
              </View>
              <View className="h-[3rem] w-full bg-[---sl] ">
                <Text className="my-auto ml-[2rem] text-[18px] font-bold">Other Status</Text>
              </View>
              <SafeAreaView className="mb-[2rem] h-[75vh]">
                <ScrollView
                  className="flex flex-col "
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  <View className=" items-center">
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                    <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                      <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                      <View className="mx-2 w-[60vw] overflow-hidden">
                        <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                          Hafiz Abubakar
                        </Text>
                        <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
            {/* CameraButton */}
            <View className="absolute bottom-[9rem] right-[1rem] shadow-[1rem] shadow-black">
              <IconAnt
                name="camera"
                size={35}
                color="#1c59dfee"
                className="m-4 rounded-full bg-[---wt] p-3 shadow-lg"
              />
            </View>
            {/* PenButton */}
            <View className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
              <IconMaterialCommunity
                name="pen"
                size={35}
                color="#1c59dfee"
                className="m-4 rounded-full bg-[---wt] p-3 shadow-lg"
              />
            </View>
          </>
        ) : null}

        {/* CallSession */}
        {Call ? (
          <>
            <View className="h-[3rem] w-full bg-[---sl] ">
              <Text className="my-auto ml-[2rem] text-[18px] font-bold">Recent Calls</Text>
            </View>
            <SafeAreaView className="mb-[2rem] h-[85vh]">
              <ScrollView
                className="flex flex-col "
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View className=" items-center">
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-incoming"
                          size={20}
                          color="red"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-outgoing"
                          size={20}
                          color="lightgreen"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-incoming"
                          size={20}
                          color="red"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-outgoing"
                          size={20}
                          color="lightgreen"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-incoming"
                          size={20}
                          color="red"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-outgoing"
                          size={20}
                          color="lightgreen"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-incoming"
                          size={20}
                          color="red"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-outgoing"
                          size={20}
                          color="lightgreen"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-incoming"
                          size={20}
                          color="red"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[50vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                        Hafiz Abubakar
                      </Text>
                      <View className="flex flex-row items-center">
                        <IconMaterialCommunity
                          name="phone-outgoing"
                          size={20}
                          color="lightgreen"
                          className="mx-2 shadow-lg"
                        />
                        <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                      </View>
                    </View>
                    <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                      <IconMaterialCommunity
                        name="phone"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                      <IconMaterialCommunity
                        name="android-messages"
                        size={30}
                        color="black"
                        className="mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        ) : null}
      </View>
    </>
  );
};

export default HomePage;
