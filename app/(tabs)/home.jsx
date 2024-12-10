import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const storedName = AsyncStorage.getItem("userName");
      if (storedName !== null) {
        setUserName(storedName);
      }
    } catch (error) {
      console.log("Error fetching name from AsyncStorage:", error);
    }
  };

  return (
    <>
      <View>
        <Text className={" text-2xl text-primary"}>Welcome {userName}</Text>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
