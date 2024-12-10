import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/toastService.js";
import DateTimePicker from "@react-native-community/datetimepicker";

const myBike = () => {
  const [bikeId, setBikeId] = useState(null);
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
    checkBikeId();
  }, []);

  const checkBikeId = async () => {
    const storedBikeId = await AsyncStorage.getItem("bikeId");
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedBikeId) {
      setBikeId(storedBikeId);
      getBikeDetails(storedBikeId);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  };

  const getBikeDetails = async (bikeId) => {
    try {
      const response = await axiosInstance.get(`/bikes/get/${bikeId}`);
      setBikeDetails(response.data);
    } catch (error) {
      console.error("Error fetching bike details", error);
    }
  };

  const handleAddBike = async () => {
    try {
      const response = await axiosInstance.post("/bikes/add", {
        user_id: userId, // Replace with actual user ID
        bike_model: bikeModel,
        bike_registration: bikeRegistration,
        purchase_date: purchaseDate,
        initial_km: initialKm,
        color: color,
      });
      const newBikeId = response.data.bikeId;
      await AsyncStorage.setItem("bikeId", newBikeId.toString());
      setBikeId(newBikeId);
      setFormVisible(false);
      getBikeDetails(newBikeId);
      showToast("success", "New bike Added", "Bike Added Successfully");
    } catch (error) {
      console.error("Error adding bike", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setShowDatePicker(Platform.OS === "ios" ? true : false); // iOS requires manually closing the picker
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
    // You can customize this format
  };

  if (bikeId && bikeDetails) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text className="text-xl font-bold mb-4">Bike Details:</Text>
        <Text className="text-lg mb-2">Model: {bikeDetails.bike_model}</Text>
        <Text className="text-lg mb-2">
          Registration: {bikeDetails.bike_registration}
        </Text>
        <Text className="text-lg mb-2">
          Purchase Date: {formatDate(bikeDetails.purchase_date)}
        </Text>
        <Text className="text-lg mb-2">
          Initial KM: {bikeDetails.initial_km}
        </Text>
        <Text className="text-lg mb-2">Color: {bikeDetails.color}</Text>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      {!formVisible ? (
        <Button title="Add Bike" onPress={() => setFormVisible(true)} />
      ) : (
        <View className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
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
          {/* Display Date Picker for Purchase Date */}
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
          <Button title="Save Bike" onPress={handleAddBike} />
        </View>
      )}
    </View>
  );
};

export default myBike;
