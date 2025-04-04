import React from "react";
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
    View,
  } from 'react-native';
const StatusSession = ()=>{
    return(<>
                
                <View className="items-center">
                  <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                    <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                    <View className="mx-2 w-[60vw] overflow-hidden">
                      <Text className="mt-[10px] h-[25px] text-[18px] font-bold">My Status</Text>
                      <Text className="my-[10px] h-[20px] text-[14px]">Today, 10:00 AM</Text>
                    </View>
                    <View className="">
                      <IconMaterialCommunity
                        name="menu"
                        size={30}
                        color="black"
                        className=" mx-2 shadow-lg"
                      />
                    </View>
                  </View>
                  <View className="h-[3rem] w-full bg-[---sl] ">
                    <Text className="my-auto ml-[2rem] text-[18px] font-bold">Other Status</Text>
                  </View>
                  <SafeAreaView className="mb-[2rem] h-[75vh]">
                    <ScrollView
                      className="flex flex-col "
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}>
                      <View className=" items-center">
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                        <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                          <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                          <View className="mx-2 w-[60vw] overflow-hidden">
                            <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                              Hafiz Abubakar
                            </Text>
                            <Text className="my-[10px] h-[20px] text-[14px]">Yesterday, 12:00 AM</Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                </View>
                {/* CameraButton */}
                <View className="absolute bottom-[9rem] right-[1rem] shadow-[1rem] shadow-black">
                  <IconAnt
                    name="camera"
                    size={35}
                    color="#1c59dfee"
                    className="m-4 rounded-full bg-[---wt] p-3 shadow-lg"
                  />
                </View>
                {/* PenButton */}
                <View className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
                  <IconMaterialCommunity
                    name="pen"
                    size={35}
                    color="#1c59dfee"
                    className="m-4 rounded-full bg-[---wt] p-3 shadow-lg"
                  />
                </View>
              </>)
}
export default StatusSession