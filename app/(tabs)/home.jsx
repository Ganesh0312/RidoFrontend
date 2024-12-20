import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../../components/HeaderComponent";

const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName !== null) {
        setUserName(storedName);
      }
    } catch (error) {
      console.log("Error fetching name from AsyncStorage:", error);
    }
  };

  return (
    <>
      <HeaderComponent label="Home" />
      <View className="flex-1 items-center justify-center ">
        <View className="p-6 rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-primary mb-4">
            Welcome {userName}
          </Text>
          <Text className="text-gray-600 text-center">
            Enjoy tracking your rides and managing your bikes with ease!
          </Text>
        </View>
      </View>
    </>
  );
};

export default Home;
