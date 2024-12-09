import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton.jsx"; // Fix the typo
import { router } from "expo-router";
import { image } from "../assets/images/Images.js";
export default function Index() {
  return (
    <>
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

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </>
  );
}
