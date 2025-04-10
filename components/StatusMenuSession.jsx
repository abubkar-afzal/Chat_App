import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
const StatusMenuSession = ({ setStatusMenu, setStatusView }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [DeleteActive, setDeleteActive] = useState(false);
  const [btnDisable, setbtnDisable] = useState(true);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setbtnDisable(!btnDisable);
  };
  return (
    <>
      <View className="mt-[2.8rem] ">
        {/* TopBar */}
        {
          DeleteActive ? <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setDeleteActive(false);
            }}>
            <Icon name="cross" size={35} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-1rem] top-[10px] text-[2rem] font-black text-white ">
              Delete
            </Text>
          </View>
          <Pressable
            className="h-[8vh] absolute right-0"
            onPress={() => {
              setDeleteActive(false);
            }}>
            <Icon name="trash" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View></View>
        </View>: <View className="flex h-[8vh] w-full flex-row justify-between overflow-hidden bg-[---b1]">
          <Pressable
            className="h-[8vh]"
            onPress={() => {
              setStatusMenu(false);
            }}>
            <IconMaterialIcon name="arrow-back" size={30} color="white" className="m-4 shadow-lg" />
          </Pressable>
          <View className="items-center">
            <Text className="absolute right-[-3rem] top-[10px] text-[2rem] font-black text-white">
              Your Status
            </Text>
          </View>
          <View></View>
        </View>
        }
        

        {/* StatusMenuSession */}
        <SafeAreaView className="h-[90vh]">
          <ScrollView>
            <View className=" items-center">
              <Pressable
                onPress={() => {
                  setStatusView(true);
                  setStatusMenu(false);
                }}
                onLongPress={()=>{
                  setDeleteActive(true)
                }}
                >
                <View className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]">
                  <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                  <View className="mx-2 w-[50vw] overflow-hidden">
                    <Text className="my-[10px] h-[20px] text-[16px]">Yesterday, 12:00 AM</Text>
                  </View>
                  <Pressable  className='w-[5rem] h-[5rem] items-center'>
                    {
                      DeleteActive ? <TouchableOpacity
                      style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                      className="my-[1.5rem] "
                      onPress={toggleCheckbox}>
                      {isChecked && <Text className="mt-[-2px] text-center">✔</Text>}
                    </TouchableOpacity>:null
                    }
                    
                  </Pressable>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
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

export default StatusMenuSession;
