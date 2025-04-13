import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AboutSession from './AboutSession';
import AccountSession from './AccountSession';
import ProfileSession from './ProfileSession';
import { useSelector } from 'react-redux';
const SettingSession = ({ setSetting,setHome }) => {
  const [SettingPage, setSettingPage] = useState(true);
  const [ProfilePage, setProfilePage] = useState(false);
  const [AboutPage, setAboutPage] = useState(false);
  const [AccountPage, setAccountPage] = useState(false);
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  console.log(user)
  return (
    <>
      {SettingPage ? (
        <View className="mt-[2.8rem] ">
          {/* TopBar */}
          <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
            <Pressable
              className="h-[8vh]"
              onPress={() => {
                setSetting(false);
              }}>
              <IconMaterialIcon
                name="arrow-back"
                size={30}
                color="white"
                className="m-4 shadow-lg"
              />
            </Pressable>
            <View className="items-center">
              <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
                Setting
              </Text>
            </View>
            <View></View>
          </View>

          {/* Profile */}
          <View className="h-[3rem] w-full bg-[---sl] ">
            <Text className="my-auto ml-[2rem] text-[18px] font-bold">Profile</Text>
          </View>
          <View className="items-center">
            <Pressable
              onPress={() => {
                setProfilePage(true);
                setSettingPage(false);
                setAccountPage(false);
                setAboutPage(false);
              }}
              className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
              <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
              <View className="mx-2 w-[60vw] overflow-hidden">
                <Text className="mt-[10px] h-[25px] text-[18px] font-bold">{user.user_name}</Text>
                <Text className="my-[10px] h-[20px] text-[14px]">
                  {user.user_bio}
                </Text>
              </View>
              <View className="">
                <IconMaterialCommunity
                  name="pen"
                  size={30}
                  color="black"
                  className=" mx-2 shadow-lg"
                />
              </View>
            </Pressable>
          </View>
          {/* otherSetting          */}
          <View className="h-[3rem] w-full bg-[---sl] ">
            <Text className="my-auto ml-[2rem] text-[18px] font-bold">Other</Text>
          </View>
          <View className="items-center">
            <Pressable
              onPress={() => {
                setProfilePage(false);
                setSettingPage(false);
                setAccountPage(true);
                setAboutPage(false);
              }}
              className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
              <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
                <IconMaterialCommunity
                  name="account"
                  size={40}
                  color="white"
                  className=" mx-2 my-auto shadow-lg"
                />
              </View>
              <View className="mx-2 ml-[2rem] w-[60vw] overflow-hidden">
                <Text className="mt-[10px] h-[25px] text-[18px] font-bold">Account</Text>
                <Text className="my-[10px] h-[20px] text-[14px] ">Privacy, Logout, Backup</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setProfilePage(false);
                setSettingPage(false);
                setAccountPage(false);
                setAboutPage(true);
              }}
              className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
              <View className="my-auto ml-3 h-[8vh] w-[16vw] items-center rounded-full bg-[---h1]">
                <IconMaterialCommunity
                  name="message-processing"
                  size={30}
                  color="white"
                  className=" mx-2 my-auto shadow-lg"
                />
              </View>
              <View className="mx-2 ml-[2rem] w-[60vw] overflow-hidden">
                <Text className="mt-[10px] h-[25px] text-[18px] font-bold">About</Text>
                <Text className="my-[10px] h-[20px] text-[14px] ">Context, Contact</Text>
              </View>
            </Pressable>
          </View>
          <View className="absolute left-[25vw] top-[90vh]">
            <Text className="mt-[10px] h-[25px] text-[16px] font-bold">
              &copy; 2025 Pigeon Message
            </Text>
          </View>
        </View>
      ) : AboutPage ? (
        <AboutSession setAboutPage={setAboutPage} setSettingPage={setSettingPage}/>
      ) : AccountPage ? (
        <AccountSession setAccountPage={setAccountPage} setSettingPage={setSettingPage} setHome={setHome}/>
      ) : ProfilePage ? (
        <ProfileSession setProfilePage={setProfilePage} setSettingPage={setSettingPage}/>
      ) : null}
    </>
  );
};
export default SettingSession;
