import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux';
const ContactSession = ({ setContact, setMessage, setSetting, setChat,setOtherUserDetails }) => {
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    const url = `http://192.168.0.100:3000/users/allusers`;

    try {
      const response = await axios.get(url);
      const { data } = response;

      if (data.success) {
        setUsers(data.allusers);
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    } catch (error) {
      Alert.alert('Error', 'User does not exist');
    }
  };
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setContact(false);
              setMessage(true);
              setContact(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white">
              Contact
            </Text>
          </View>
          <View></View>
        </View>

        {/* ContactSession */}
        <View className=" items-center">
          <Pressable
            onPress={() => {}}
            className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]">
              <IconMaterialIcon
                name="person-add-alt"
                size={30}
                color="white"
                className="m-4 shadow-lg"
              />
            </View>
            <View className="mx-2 w-[60vw] overflow-hidden">
              <Text className="mt-auto h-[25px] text-[18px] font-bold">New Contact</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {}}
            className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]">
              <IconMaterialIcon
                name="group-add"
                size={30}
                color="white"
                className="m-4 shadow-lg"
              />
            </View>
            <View className="mx-2 w-[60vw] overflow-hidden">
              <Text className="mt-auto h-[25px] text-[18px] font-bold">New Group</Text>
            </View>
          </Pressable>
        </View>
        <View className="h-[3rem] w-full bg-[---sl] ">
          <Text className="my-auto ml-[2rem] text-[18px] font-bold">All Contacts</Text>
        </View>
        <SafeAreaView className="h-[90vh]">
          <ScrollView>
            <View className=" items-center">
              {Users.map((items) => {
                return (
                  <Pressable
                    key={items.user_email}
                    disabled={items.user_email == user.user_email ? true : false}
                    onPress={() => {
                      setContact(false);
                      setMessage(false);
                      setChat(true);
                      setSetting(false);
                      
                      setOtherUserDetails({
                        reciver_name:  items.user_name,
                        reciver_email:  items.user_email,
                        reciver_phone:  items.user_phone,
                      });
                    }}
                    className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1] disabled:opacity-60">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]">
                      {items.user_picture ? (
                          <Image
                            source={{ uri: items.user_picture }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                            className='rounded-full'
                          />
                        ) : null}
                    </View>
                    <View className="mx-2 w-[70vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                       {user.user_email == items.user_email ? "Me":items.user_name}
                      </Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">
                        {items.user_bio ? items.user_bio : 'No bio yet'}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};
export default ContactSession;
