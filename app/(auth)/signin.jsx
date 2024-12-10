import { Dimensions, Image, ScrollView, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { Link, useRouter } from "expo-router";
import { image } from "../../assets/images/Images.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance.js";
import showToast from "../../utils/toastService.js";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      showToast("error", "Error", "Please fill in all fields");
      return;
    }
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const { token, userId, userName, userEmail } = response.data;

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId.toString());
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userEmail", userEmail);
      showToast("success", "Success", "Login successful!");
      router.push("/home");
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data.error || error.message
      );
      showToast(
        "error",
        "Error",
        error.response?.data.error || "An error occurred."
      );
    }
  };

  return (
    <>
      <SafeAreaView className=" bg-priblue-100 h-full">
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Image
              source={image.raider} // Correct image source
              resizeMode="contain"
              className="w-[115px] h-[34px]"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Log in to Rido
            </Text>

            <FormField
              title="Email"
              value={form.email}
              placeholder="Enter your email"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              placeholder="Enter your password"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              showPasswordToggle={true} // Add this prop
            />

            <CustomButton
              title="Sign In"
              handlePress={handleSignIn}
              containerStyles="mt-7"
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/signup"
                className="text-lg font-psemibold text-secondary"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
