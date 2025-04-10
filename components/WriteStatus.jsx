import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
const WriteStatusSession = ({ setWriteStatus }) => {
  const [TextStatus, setTextStatus] = useState('');
  const [BackgroundColor, setBackgroundColor] = useState('bg-white');
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setWriteStatus(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-6rem] top-[12px] text-[1.7rem] font-black text-white">
              Write Your Thought
            </Text>
          </View>
          <View></View>
        </View>

        {/* WriteStatusSession */}
        <View className={`h-[95vh] w-full items-center ${BackgroundColor}`}>
          <TextInput
            onChange={(text) => {
              setTextStatus(text);
            }}
            value={TextStatus}
            multiline={true}
            placeholder="Write your thought here..."
            className={`h-[70vh] w-[95vw] rounded-[1rem] p-4 text-center text-[18px] ${BackgroundColor == "bg-white" ? "text-black":"placeholder:text-white text-white"}`}
          />
          <View className="flex flex-row">
            <Pressable onPress={() => {setBackgroundColor('bg-red-500')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-red-500 shadow-lg"></View>
            </Pressable>
            <Pressable onPress={() => {setBackgroundColor('bg-blue-500')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-blue-500 shadow-lg"></View>
            </Pressable>
            <Pressable onPress={() => {setBackgroundColor('bg-green-500')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-green-500 shadow-lg"></View>
            </Pressable>
            <Pressable onPress={() => {setBackgroundColor('bg-yellow-500')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-yellow-500 shadow-lg"></View>
            </Pressable>
            <Pressable onPress={() => {setBackgroundColor('bg-pink-500')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-pink-500 shadow-lg"></View>
            </Pressable>
            <Pressable onPress={() => {setBackgroundColor('bg-white')}}>
              <View className="m-2 h-[2rem] w-[2rem] rounded-[1rem] bg-white shadow-lg"></View>
            </Pressable>
          </View>

          <Pressable className="mt-[1rem] h-[4rem] w-[4rem] rounded-full bg-[---sent]">
            <Icon name="paper-plane" size={30} color="white" className="m-4 shadow-lg " />
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default WriteStatusSession;
