import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ViewProfileSession = ({ setViewProfile, setChat }) => {
  const [Name, setName] = useState('Hafiz Abubakar');
  const [Email, setEmail] = useState('hafizabubakar@gmial.com');
  const [Phone, setPhone] = useState('+923270972423');
  const [DB, setDB] = useState('10/07/2005');
  const [Bio, setBio] = useState('💻❤️asdasdasdasd asd as af daf adasd afasdfs asdfasdfasdsd as ');
  const [SelectName, setSelectName] = useState(false);
  const [SelectEmail, setSelectEmail] = useState(false);
  const [SelectPhone, setSelectPhone] = useState(false);
  const [SelectDB, setSelectDB] = useState(false);
  const [SelectBio, setSelectBio] = useState(false);
  return (
    <>
    
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setChat(true);
              setViewProfile(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-3rem] top-[10px] text-[2rem] font-black text-white">
              User Profile
            </Text>
          </View>
          <View></View>
        </View>

        {/* ViewProfileSession */}
        
        <View className="items-center">
          
            <View className="my-[2rem] flex h-[85vh] w-[90vw] flex-col items-center rounded-[1rem] bg-[---d1]">
              <View className="my-[1rem] ml-3 h-[30vh] w-[60vw] rounded-full bg-[---h1]"></View>
              <View className="m-4 flex w-[70vw] flex-row items-center overflow-hidden">
                <Text>Name:</Text>
                <Text className='mx-2'>{Name}</Text>
              </View>
              <View className="m-4 flex w-[70vw] flex-row  items-center overflow-hidden">
                <Text>Bio:</Text>
                <Text className='mx-2'>{Bio}</Text>
               
              </View>
              <View className="m-4 flex w-[70vw] flex-row  overflow-hidden">
                <Text>Email:</Text>
                <Text className='mx-2'>{Email}</Text>
                
              </View>
              <View className="m-4 flex w-[70vw] flex-row  overflow-hidden">
                <Text>Date Of Birth:</Text>
                <Text className='mx-2'>{DB}</Text>
                
              </View>
              <View className="m-4 flex w-[70vw] flex-row  overflow-hidden">
                <Text>Phone:</Text>
                <Text className='mx-2'>{Phone}</Text>
                
              </View>
              <Pressable>
                        <View className="my-2 flex h-auto w-full flex-row items-center bg-[---msg] p-2 px-6 rounded-[1rem]">
                          <IconAnt name="sharealt" size={25} color="white" className=" shadow-lg" />
                          <Text className=" ml-2 text-[18px] text-white">Share</Text>
                        </View>
                      </Pressable>
                      <Pressable>
                                <View className="my-2 flex h-auto w-full flex-row items-center bg-[---lo] p-2 px-6 rounded-[1rem]">
                                  <IconMaterialIcon name="block" size={25} color="white" className=" shadow-lg" />
                                  <Text className=" ml-2 text-[18px] text-white">Block</Text>
                                </View>
                              </Pressable>
            </View>
          
        </View>
      </View>
      
    </>
  );
};
export default ViewProfileSession;
