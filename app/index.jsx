import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton.jsx"; // Fix the typo
import { router, useRouter } from "expo-router";
import { image } from "../assets/images/Images.js";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    checkUserToken();
  }, []);
  const checkUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-priblue h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }
  return (
    <>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
      <SafeAreaView className="bg-priblue h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center h-full px-4">
            {/* <Image
              source={image.raider}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            /> */}

            <Image
              source={image.ronin}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{"\n"}
                Rides with{" "}
                <Text className="text-secondary-200 text-4xl">Rido</Text>
              </Text>

              {/* <Image
                source={image.raider}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              /> */}
            </View>

            {/* <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text> */}

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/signin")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
