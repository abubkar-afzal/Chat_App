import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
const NewCallSession = ({ setNewCall }) => {
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setNewCall(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-2rem] top-[10px] text-[2rem] font-black text-white">
              Make Call 
            </Text>
          </View>
          <View></View>
        </View>

        {/* NewCallSession */}
        
         
         <View className="h-[3rem] w-full bg-[---sl] ">
                <Text className="my-auto ml-[2rem] text-[18px] font-bold">Users</Text>
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
                        <Text className="my-auto h-[25px] text-[18px] font-bold">Hafiz Abubakar</Text>
                        
                      </View>
                      <View className="ml-[-1rem] flex h-[10vh] flex-row items-center">
                        <IconMaterialCommunity
                          name="phone"
                          size={30}
                          color="black"
                          className="mx-2 shadow-lg"
                        />
                        <Pressable onPress={() => setChat(true)}>
                          <IconMaterialCommunity
                            name="video"
                            size={30}
                            color="black"
                            className="mx-2 shadow-lg"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
          
       
      </View>
    </>
  );
};
export default NewCallSession;
