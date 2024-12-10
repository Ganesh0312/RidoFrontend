import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { image } from "../../assets/images/Images.js";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    profile_picture: null,
  });

  const router = useRouter();

  // const handleImagePick = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     base64: true,
  //     quality: 0.5, // Reduce size for performance
  //   });

  //   if (!result.canceled) {
  //     setForm({ ...form, profile_picture: result.assets[0].uri }); // Save the URI of the image
  //     Toast.show({
  //       type: "success",
  //       text1: "Profile Picture Selected",
  //     });
  //   }
  // };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true, // Include base64 encoded image
      quality: 0.5, // Compress for smaller size
    });

    if (!result.canceled) {
      setForm({
        ...form,
        profile_picture: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
      Toast.show({
        type: "success",
        text1: "Profile Picture Selected",
      });
    }
  };

  const handleSignUp = async () => {
    const { username, email, password, phone_number, profile_picture } = form;

    if (!username || !email || !password || !phone_number || !profile_picture) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phone_number);

    // Add the image file (uri must be converted to file object for FormData)
    formData.append("profile_picture", {
      uri: profile_picture,
      name: "profile.jpg", // Replace with your file's name
      type: "image/jpeg", // Replace with your file's type
    });

    console.log("FormData to be sent:", formData);

    try {
      const response = await axios.post(
        "http://192.168.161.121:8080/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User registered successfully!",
      });
      setForm({
        username: "",
        email: "",
        password: "",
        phone_number: "",
        profile_picture: null,
      });
      setTimeout(() => router.push("/signin"), 1000);
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.response?.data?.error || "An error occurred.",
      });
    }
  };

  return (
    <SafeAreaView className="bg-priblue-100 h-full">
      <Toast />
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className=" flex justify-center text-2xl font-semibold text-white mt-10 ml-24 mb-16 text-3xl font-psemibold">
            Register to Rido
          </Text>

          {/* Profile Picture Circle */}
          <TouchableOpacity
            style={styles.imageCircle}
            onPress={handleImagePick}
          >
            {form.profile_picture ? (
              <Image
                source={{ uri: form.profile_picture }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.uploadText}>Upload Image</Text>
            )}
          </TouchableOpacity>

          <FormField
            title="UserName"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Phone Number"
            value={form.phone_number}
            placeholder="Enter your phone number"
            handleChangeText={(e) => setForm({ ...form, phone_number: e })}
            otherStyles="mt-7"
            keyboardType="numeric"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            showPasswordToggle={true}
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  uploadText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "bold",
  },
});
