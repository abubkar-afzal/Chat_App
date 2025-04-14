import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeature from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
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
import { useSelector } from 'react-redux';
import axios from 'axios';

const MessageSession = ({ setMessage, setChat, setContact }) => {
  const data = useSelector((state) => state.reducer);
  const [user] = data;
  const [Email, setEmail] = useState(user.user_email);
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (!Email) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    const url = `http://192.168.0.107:3000/users/messages/${encodeURIComponent(Email)}`;
    console.log('🚀 Requesting user with URL:', url);

    try {
      const response = await axios.get(url);
      const { data } = response;
    
      if (data.success) {
        // Format messages before setting them
        const formattedMessages = formatMessages(data.messages);
        setMessages(formattedMessages);
      } else {
        console.log('❌ Error:');
        Alert.alert('Error', 'User does not exist');
      }
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };

  const formatMessages = (messages) => {
    // Sort messages by time (latest first)
    const sortedMessages = messages.sort((a, b) => new Date(b.message_time) - new Date(a.message_time));

    // Group messages by sender/receiver
    const groupedMessages = [];
    const grouped = {};

    sortedMessages.forEach((message) => {
      const key = `${message.user_name}-${message.reciver_name}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(message);
    });

    // Get the latest message for each sender/receiver pair
    for (const key in grouped) {
      const latestMessage = grouped[key][0]; // since the messages are sorted by time, the first one is the latest
      groupedMessages.push(latestMessage);
    }

    return groupedMessages;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  };

  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <SafeAreaView className="mb-[2rem] h-[92vh]">
        <ScrollView
          className="flex flex-col"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View className="items-center">
            {Messages.length > 0 ? Messages.map((item) => {
              return (
                <Pressable
                  key={item.message_id}
                  onPress={() => {
                    setContact(false);
                    setMessage(false);
                    setChat(true);
                  }}
                  onLongPress={() => {
                    setDeleteMessage(true);
                  }}
                  className="my-[0.5rem] flex h-[10vh] w-[95vw] flex-row items-center rounded-[1rem] bg-[---d1]"
                >
                  <View className="my-auto ml-3 h-[8vh] w-[16vw] rounded-full bg-[---h1]"></View>
                  <View className="mx-2 w-[60vw] overflow-hidden">
                    <Text className="mt-[10px] h-[25px] text-[18px] font-bold">
                      {item.user_name === user.user_name ? item.reciver_name : item.user_name}
                    </Text>
                    <Text className="my-[10px] h-[20px] text-[14px]">{item.message}</Text>
                  </View>
                  <View className="flex h-[10vh] flex-col">
                    {DeleteMessage ? (
                      <TouchableOpacity
                        style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                        className="absolute top-4 mx-2 shadow-lg"
                        onPress={toggleCheckbox}>
                        {isChecked && <Text className="">✔</Text>}
                      </TouchableOpacity>
                    ) : (
                      <IconMaterialCommunity
                        name="pin"
                        size={20}
                        color="black"
                        className="absolute left-[1rem] top-2 mx-2 shadow-lg"
                      />
                    )}
                    <Text className="absolute bottom-2  text-[10px]">
                      {formatTime(item.message_time)}
                    </Text>
                  </View>
                </Pressable>
              );
            }) : (
              <View className="items-center h-[90vh]">
                <Text className="my-auto">There is no message, please talk to anyone..!!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {DeleteMessage ? (
        <Pressable
          onPress={() => {
            setDeleteMessage(false);
          }}
          className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
          <Icon
            name="trash"
            size={50}
            color="#1c59dfee"
            className="m-7 rounded-full bg-[---wt] shadow-lg"
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setContact(true);
            setMessage(false);
            setChat(false);
          }}
          className="absolute bottom-[4rem] right-[1rem] shadow-[1rem] shadow-black">
          <IconAnt
            name="pluscircle"
            size={50}
            color="#1c59dfee"
            className="m-7 rounded-full bg-[---wt] shadow-lg"
          />
        </Pressable>
      )}
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
