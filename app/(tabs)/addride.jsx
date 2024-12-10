import { Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/toastService";

const AddRide = () => {
  const [rideDetails, setRideDetails] = useState({});
  return (
    <View>
      <Text>AddRide</Text>
    </View>
  );
};

export default AddRide;
