import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

const AboutSession = ({ setSettingPage, setAboutPage }) => {
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setSettingPage(true);
              setAboutPage(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
              About
            </Text>
          </View>
          <View></View>
        </View>

        {/* AboutSession */}
        <SafeAreaView className='h-[90vh]'>
          <ScrollView>
          <View className="p-4 items-center">
          <Text className="text-lg font-bold mb-2 text-[25px]">About Peigon Message</Text>
          <Text className="text-center text-[18px]">
            Peigon Message is a real-time chating application designed to connect people easily.
            With features like instant messaging, calling and multimedia sharing, it provides
            a user-friendly platform for communication. Stay connected with your friends, family,
            or colleagues anytime, anywhere.
          </Text>
        </View>
        <View className="p-4 items-center">
          <Text className="text-lg font-bold mb-2 text-[25px]">About Devlopment</Text>
          <Text className="text-center text-[18px]">
            This app is developed by Hafiz Muhammad Abubakar Afzal. It is a personal project created to enhance
            my skills in React Native, mobile app and full stack development. The app is built using React Native and some other javascript libraries.
            The goal is to provide a seamless messaging experience while learning and implementing some thing new.
            I am constantly working on improving the app by adding new features and fixing bugs.
          </Text>
        </View>
        <View className="p-4 items-center">
          <Text className="text-lg font-bold mb-2 text-[25px]">Contact</Text>
          <View className='items-center'>
          <Pressable
            className="items-center flex flex-row"
           >
            <IconAwesome name="whatsapp" size={30} color="lightgreen" className="m-4 shadow-lg" />
            <Text className='text-[18px] text-[---h1] underline'>+923270972423</Text>
          </Pressable>
          <Pressable
            className="items-center flex flex-row"
           >
            <IconMaterialCommunity name="email" size={30} color="lightblue" className="m-4 shadow-lg" />
            <Text className='text-[16px] text-[---h1] underline'>hafizabubakarafzal@gmail.com</Text>
          </Pressable>
          <Pressable
            className="items-center flex flex-row"
           >
            <IconAwesome name="linkedin-square" size={30} color="blue" className="m-4 shadow-lg" />
            <Text className='text-[18px] text-[---h1] underline'>Hafiz Abubakar Afzal</Text>
          </Pressable>
          <Pressable
            className="items-center flex flex-row"
           >
            <IconAwesome name="github" size={30} color="blac" className="m-4 shadow-lg" />
            <Text className='text-[18px] text-[---h1] underline'>abubkar-afzal</Text>
          </Pressable><Pressable
            className="items-center flex flex-row"
           >
            <IconAwesome name="instagram" size={30} color="pink" className="m-4 shadow-lg" />
            <Text className='text-[18px] text-[---h1] underline'>mr.syco.1</Text>
          </Pressable>
          </View>
        </View>
          </ScrollView>
        </SafeAreaView>
       
      </View>
    </>
  );
};
export default AboutSession;
