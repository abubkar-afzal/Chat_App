import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native';
const MessageSession = ({ setMessage, setChat, setContact }) => {
  const [DeleteMessage,setDeleteMessage] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
  return (
    <>
      <SafeAreaView className="mb-[2rem] h-[92vh]">
        <ScrollView
          className="flex flex-col "
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View className=" items-center">
            <Pressable
              onPress={() => {
                setContact(false);
                setMessage(false);
                setChat(true);
              }}
              onLongPress={()=>{setDeleteMessage(true)}}
              className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
              <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
              <View className="mx-2 w-[60vw] overflow-hidden">
                <Text className="mt-[10px] h-[25px] text-[18px] font-bold">Hafiz Abubakar</Text>
                <Text className="my-[10px] h-[20px] text-[14px]">
                  Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                </Text>
              </View>
              <View className="flex h-[10vh] flex-col">
                {
                  DeleteMessage ? <TouchableOpacity
                                        style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                                        className=" absolute  top-4 mx-2 shadow-lg"
                                        onPress={toggleCheckbox}>
                                        {isChecked && <Text className=" ">✔</Text>}
                                      </TouchableOpacity>:<IconMaterialCommunity
                name="pin"
                size={20}
                color="black"
                className="absolute left-[1rem] top-2 mx-2 shadow-lg"
              />
                }
                
                <Text className="absolute bottom-2 left-[-1rem] text-[10px]">10:00 AM</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
        
      {
        DeleteMessage ? 
        <Pressable
          onPress={() => {
            setDeleteMessage(false)
          }}
          className="absolute  bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
          <Icon
            name="trash"
            size={50}
            color="#1c59dfee"
            className="m-7 rounded-full bg-[---wt]  shadow-lg"
          />
        </Pressable> :
      <Pressable
        onPress={() => {
          setContact(true);
          setMessage(false);
          setChat(false);
        }}
        className="absolute  bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
        <IconAnt
          name="pluscircle"
          size={50}
          color="#1c59dfee"
          className="m-7 rounded-full bg-[---wt]  shadow-lg"
        />
      </Pressable>  
      }
        
    </>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxChecked: {},
  checkmark: {
    fontSize: 20,
  },
});
export default MessageSession;
