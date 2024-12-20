import React, { useEffect, useState } from "react";
import { Text, View, TextInput, ScrollView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/toastService.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../../components/CustomButton.jsx";
import HeaderComponent from "../../components/HeaderComponent.jsx";

const MyBike = () => {
  const [bikeDetails, setBikeDetails] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [bikeModel, setBikeModel] = useState("");
  const [bikeRegistration, setBikeRegistration] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(null); // Date state
  const [initialKm, setInitialKm] = useState("");
  const [color, setColor] = useState("");
  const [userId, setUserId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility

  useEffect(() => {
    const initialize = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        getBikeDetails(storedUserId);
      }
    };
    initialize();
  }, []);

  const getBikeDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/bikes/getbyuserid/${userId}`);
      if (response.data) {
        setBikeDetails(response.data);

        // Ensure bikeId exists before setting it
        if (response.data.bike_id) {
          await AsyncStorage.setItem(
            "bikeId",
            response.data.bike_id.toString()
          );
        } else {
          console.warn("bikeId is not present in the response data.");
        }
      } else {
        setBikeDetails(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error: No bike found for the user
        console.warn("No bike found for the user.");
        setBikeDetails(null);
      } else {
        // Handle other errors
        console.error("Error fetching bike details:", error);
      }
    }
  };

  const handleAddBike = async () => {
    try {
      const response = await axiosInstance.post("/bikes/add", {
        user_id: userId,
        bike_model: bikeModel,
        bike_registration: bikeRegistration,
        purchase_date: purchaseDate,
        initial_km: initialKm,
        color: color,
      });
      const newBikeId = response.data.bikeId;
      await AsyncStorage.setItem("bikeId", newBikeId.toString());
      setFormVisible(false);
      getBikeDetails(userId);
      showToast("success", "New bike Added", "Bike Added Successfully");
    } catch (error) {
      console.error("Error adding bike", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setShowDatePicker(false); // Close picker on selection
    setPurchaseDate(currentDate);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (bikeDetails) {
    return (
      <>
        <HeaderComponent label="My Bike" />
        <ScrollView className="flex-1 bg-gray-100 p-4">
          <View className="bg-white shadow-lg rounded-lg p-6">
            <Text className="text-2xl font-bold mb-4 text-gray-800">
              Bike Details
            </Text>
            <Text className="text-lg text-gray-600 mb-2">
              Model: {bikeDetails.bike_model}
            </Text>
            <Text className="text-lg text-gray-600 mb-2">
              Registration: {bikeDetails.bike_registration}
            </Text>
            <Text className="text-lg text-gray-600 mb-2">
              Purchase Date: {formatDate(bikeDetails.purchase_date)}
            </Text>
            <Text className="text-lg text-gray-600 mb-2">
              Initial KM: {bikeDetails.initial_km}
            </Text>
            <Text className="text-lg text-gray-600 mb-2">
              Color: {bikeDetails.color}
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <HeaderComponent label="My Bike" />
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        {!formVisible ? (
          <CustomButton
            title="Add Bike"
            handlePress={() => setFormVisible(true)}
            containerStyles="w-full mt-7 bg-blue-500 text-white py-3 rounded-lg shadow"
          />
        ) : (
          <View className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <Text className="text-xl font-semibold mb-4 text-gray-800">
              Add New Bike
            </Text>
            <TextInput
              className="border-b-2 border-gray-300 mb-4 p-2"
              placeholder="Bike Model"
              value={bikeModel}
              onChangeText={setBikeModel}
            />
            <TextInput
              className="border-b-2 border-gray-300 mb-4 p-2"
              placeholder="Bike Registration"
              value={bikeRegistration}
              onChangeText={setBikeRegistration}
            />
            <TextInput
              className="border-b-2 border-gray-300 mb-4 p-2"
              placeholder="Purchase Date"
              value={purchaseDate ? formatDate(purchaseDate) : ""}
              onTouchStart={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={purchaseDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TextInput
              className="border-b-2 border-gray-300 mb-4 p-2"
              placeholder="Initial KM"
              value={initialKm}
              onChangeText={setInitialKm}
              keyboardType="numeric"
            />
            <TextInput
              className="border-b-2 border-gray-300 mb-4 p-2"
              placeholder="Color"
              value={color}
              onChangeText={setColor}
            />
            <CustomButton
              title="Save Bike"
              handlePress={handleAddBike}
              containerStyles="bg-blue-500 text-white py-3 mt-4 rounded-lg shadow"
            />
          </View>
        )}
      </View>
    </>
  );
};

export default MyBike;
