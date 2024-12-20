import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HeaderComponent = ({ label }) => {
  return (
    <View className=" h-14 bg-priblue-300 justify-center items-center bg-sky-500">
      <Text className="text-2xl font-extrabold text-secondary  text-center">
        {label}
      </Text>
    </View>
  );
};

export default HeaderComponent;
