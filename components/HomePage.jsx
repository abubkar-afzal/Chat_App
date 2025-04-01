import React from "react";
import { Text, View } from "react-native";

const HomePage = ()=>{
    return(<>
        <View className="mt-[2.8rem]">
        {/* topBar */}
        <View className="bg-[---b1] w-full h-[8vh] justify-between flex flex-row">
            <View className="bg-[---h1] h-[8vh]"><Text>Hello</Text></View>
            <View className="bg-[---b1] h-[8vh]"><Text>Hello</Text></View>
            <View className="bg-[---d1] h-[8vh]"><Text>Hello</Text></View>
        </View>
        </View>
    </>)
}

export default HomePage