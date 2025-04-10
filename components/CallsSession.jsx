import React from 'react';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
const CallsSession = ({ setNewCall, setChat }) => {
  return (
    <>
      <View className="h-[3rem] w-full bg-[---sl] ">
        <Text className="my-auto ml-[2rem] text-[18px] font-bold">Recent Calls</Text>
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
                <Text className="mt-[10px] h-[25px] text-[18px] font-bold">Hafiz Abubakar</Text>
                <View className="flex flex-row items-center">
                  <IconMaterialCommunity
                    name="phone-incoming"
                    size={20}
                    color="red"
                    className="mx-2 shadow-lg"
                  />
                  <Text className="my-[10px] h-[20px] text-[14px]">March 23, 3:00 PM</Text>
                </View>
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
                    name="android-messages"
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
      {/* PenButton */}
      <Pressable onPress={()=>{setNewCall(true)}} className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
        <IconMaterialIcon
          name="add-call"
          size={35}
          color="#1c59dfee"
          className="m-4 rounded-full bg-[---wt] p-3 shadow-lg"
        />
      </Pressable>
    </>
  );
};
export default CallsSession;
