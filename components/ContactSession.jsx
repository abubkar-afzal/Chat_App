import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
const ContactSession = ({ setContact, setMessage, setSetting, setChat }) => {
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
            onPress={() => {
              
            }}
            className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]">
              <IconMaterialIcon name="person-add-alt" size={30} color="white" className="m-4 shadow-lg" />
            </View>
            <View className="mx-2 w-[60vw] overflow-hidden">
              <Text className="mt-auto h-[25px] text-[18px] font-bold">New Contact</Text>
              
            </View>
            
          </Pressable>

          <Pressable
            onPress={() => {
              
            }}
            className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
            <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"><IconMaterialIcon name="group-add" size={30} color="white" className="m-4 shadow-lg" /></View>
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
                      <Pressable onPress={()=>{
                        setContact(false);
                        setMessage(false);
                        setChat(true);
                        setSetting(false);
                      }}  className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                        <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                        <View className="mx-2 w-[70vw] overflow-hidden">
                          <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                            Hafiz Abubakar
                          </Text>
                          <Text className="my-[10px] h-[20px] text-[14px]">
                            Hi! How Are You. I Hope That You Are Fine. This Is A Sample Message
                          </Text>
                        </View>
                        
                      </Pressable>
                      
                    </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};
export default ContactSession;
