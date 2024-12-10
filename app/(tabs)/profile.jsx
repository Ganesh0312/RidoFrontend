import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axiosInstance from "../../utils/axiosInstance";
import { image } from "../../assets/images/Images";
const Profile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        const userToken = await AsyncStorage.getItem("userToken");

        if (!userToken) {
          router.replace("/signin");
          return;
        }

        if (userEmail) {
          const response = await axiosInstance.get(
            `/user/getuser/${userEmail}`
          );
          setUserDetails(response.data);
        } else {
          console.error("User email not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              router.replace("/signin");
            } catch (error) {
              console.error("Logout Error:", error);
              Alert.alert("Error", "Something went wrong while logging out.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-700">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <Text className="text-4xl font-bold text-center text-blue-600 mb-8">
        User Profile
      </Text>

      {/* Profile Picture */}
      <View className="items-center  mb-8">
        <Image
          source={
            userDetails?.profile_picture
              ? {
                  uri: `data:image/jpeg;base64,${userDetails?.profile_picture}`,
                }
              : image.profile_image
          }
          className="w-32 h-32 rounded-full bg-gray-300 mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-gray-900">
          {userDetails?.username || "N/A"}
        </Text>
      </View>

      {/* User Details */}
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg text-gray-700 mb-4">
          <Text className="font-bold">Email: </Text>
          {userDetails?.email || "N/A"}
        </Text>
        <Text className="text-lg text-gray-700">
          <Text className="font-bold">Phone Number: </Text>
          {userDetails?.phone_number || "N/A"}
        </Text>
      </View>

      {/* Logout Button */}
      <View className="mt-auto">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
