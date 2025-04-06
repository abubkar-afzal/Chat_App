import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PrivacySession from './PrivacySession';
const AccountSession = ({ setSettingPage, setAccountPage }) => {
  const [Backup, setBackup] = useState(false);
  const [PrivacyPage, setPrivacyPage] = useState(false);
  const [AccountPageForPrivacy, setAccountPageForPrivacy] = useState(true);
  return (
    <>
    {
      AccountPageForPrivacy ? 
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setSettingPage(true);
              setAccountPage(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
              Account
            </Text>
          </View>
          <View></View>
        </View>

        {/* AccountSession */}
        <View className="items-center">
          <Pressable onPress={() => {
              setPrivacyPage(true);
              setAccountPageForPrivacy(false)
            }} className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
              <IconMaterialCommunity
                name="lock"
                size={30}
                color="white"
                className=" mx-2 my-auto shadow-lg"
              />
            </View>
            <View className="mx-2 ml-[2rem] w-[60vw] overflow-hidden">
              <Text className="mt-[10px] h-[25px] text-[18px] font-bold">Privacy</Text>
              <Text className="my-[10px] h-[20px] text-[14px] ">Message, Status, Call</Text>
            </View>
          </Pressable>
          <Pressable className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
              <IconMaterialIcon
                name="backup"
                size={30}
                color="white"
                className=" mx-2 my-auto shadow-lg"
              />
            </View>
            <View className="mx-2 ml-[2rem] w-[45vw] overflow-hidden">
              <Text className="mt-auto h-[25px] text-[18px] font-bold">Chat Backup</Text>
            </View>
            <View className="w-[15vw] overflow-hidden">
              <Switch
                trackColor={{ false: 'white', true: '#7d79f438' }}
                thumbColor={Backup ? '#1c59dfee' : '#7d79f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setBackup(!Backup);
                }}
                value={Backup}
              />
            </View>
          </Pressable>
        </View>
        <View className='items-center'>
          <Pressable className='w-[30vw] '>
            <Text className=" my-[1rem] rounded-[1rem] bg-[---lo] font-black p-4 px-[2rem] text-white ">
              Logout
            </Text>
          </Pressable>
        </View>
      </View> : PrivacyPage ? <PrivacySession setPrivacyPage={setPrivacyPage} setAccountPageForPrivacy={setAccountPageForPrivacy} /> : null
    }
    </>
  );
};
export default AccountSession;
