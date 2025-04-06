import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
const PrivacySession = ({ setAccountPageForPrivacy, setPrivacyPage }) => {
  const [Message, setMessage] = useState(false);
  const [Status, setStatus] = useState(false);
  const [Call, setCall] = useState(false);
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setPrivacyPage(false);
              setAccountPageForPrivacy(true)
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
              Privacy
            </Text>
          </View>
          <View></View>
        </View>

        {/* PrivacySession */}
       <View className='items-center'> 
        <Pressable className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                   <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
                     <IconMaterialCommunity
                       name="check-all"
                       size={30}
                       color="white"
                       className=" mx-2 my-auto shadow-lg"
                     />
                   </View>
                   <View className="mx-[1rem] w-[45vw] overflow-hidden">
                     <Text className="mt-auto h-[25px] text-[16px] font-bold">Double Tick On Reply</Text>
                   </View>
                   <View className="w-[15vw] overflow-hidden">
                     <Switch
                       trackColor={{ false: 'white', true: '#7d79f438' }}
                       thumbColor={Message ? '#1c59dfee' : '#7d79f4'}
                       ios_backgroundColor="#3e3e3e"
                       onValueChange={() => {
                         setMessage(!Message);
                       }}
                       value={Message}
                     />
                   </View>
                 </Pressable>
                 <Pressable className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                   <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
                     <IconMaterialCommunity
                       name="list-status"
                       size={30}
                       color="white"
                       className=" mx-2 my-auto shadow-lg"
                     />
                   </View>
                   <View className="mx-[1rem] w-[45vw] overflow-hidden">
                     <Text className="mt-auto h-[25px] text-[15px] font-bold">Status Only For Contact</Text>
                   </View>
                   <View className="w-[15vw] overflow-hidden">
                     <Switch
                       trackColor={{ false: 'white', true: '#7d79f438' }}
                       thumbColor={Status ? '#1c59dfee' : '#7d79f4'}
                       ios_backgroundColor="#3e3e3e"
                       onValueChange={() => {
                         setStatus(!Status);
                       }}
                       value={Status}
                     />
                   </View>
                 </Pressable>
                 <Pressable className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                   <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
                     <IconMaterialIcon
                       name="app-blocking"
                       size={30}
                       color="white"
                       className=" mx-2 my-auto shadow-lg"
                     />
                   </View>
                   <View className="mx-[1rem] w-[45vw] overflow-hidden">
                     <Text className="mt-auto h-[25px] text-[16px] font-bold">Block Unknown Calls</Text>
                   </View>
                   <View className="w-[15vw] overflow-hidden">
                     <Switch
                       trackColor={{ false: 'white', true: '#7d79f438' }}
                       thumbColor={Call ? '#1c59dfee' : '#7d79f4'}
                       ios_backgroundColor="#3e3e3e"
                       onValueChange={() => {
                         setCall(!Call);
                       }}
                       value={Call}
                     />
                   </View>
                 </Pressable>
                 </View>
        
      </View>
    </>
  );
};
export default PrivacySession;
