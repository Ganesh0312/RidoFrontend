// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axiosInstance from "../../utils/axiosInstance";
// import showToast from "../../utils/toastService";
// import { useRouter } from "expo-router";

// const AddRide = () => {
//   const router = useRouter();
//   const [bikeId, setBikeId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [rideDetails, setRideDetails] = useState({
//     user_id: "",
//     bike_id: "",
//     ride_date: "",
//     day_of_week: "",
//     ride_type: "",
//     ride_day_count: "",
//     start_time: "",
//     start_km: "",
//     start_avg_mileage: "",
//     start_dte: "",
//     start_add: "",
//     end_add: "",
//     via_stops: "",
//     end_time: "",
//     end_km: "",
//     end_avg_mileage: "",
//     end_dte: "",
//     fuel_used: "",
//     balance_petrol: "",
//     dte_status: "",
//     commutation_type: "",
//     comm_time: "",
//     drive_mode: "",
//     drive_type: "",
//     remarks: "",
//   });

//   useEffect(() => {
//     checkBikeId();
//   }, []);

//   const checkBikeId = async () => {
//     const storedBikeId = await AsyncStorage.getItem("bikeId");
//     if (!storedBikeId) {
//       showToast("info", "No Bike Found", "Please add a bike first.");
//       router.push("myBike");
//     } else {
//       setBikeId(storedBikeId);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setRideDetails((prev) => ({ ...prev, [field]: value }));
//   };

//   const validateFields = () => {
//     const requiredFields = [
//       "ride_date",
//       "start_time",
//       "start_km",
//       "end_time",
//       "end_km",
//     ];
//     for (let field of requiredFields) {
//       if (!rideDetails[field]) {
//         showToast(
//           "error",
//           "Validation Error",
//           `${field.replace(/_/g, " ")} is required.`
//         );
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleAddRide = async () => {
//     if (!validateFields()) return;

//     try {
//       setIsSubmitting(true);

//       const rideData = { ...rideDetails, bike_id: bikeId };
//       const response = await axiosInstance.post("/rides/add", rideData);

//       if (response.status === 201) {
//         showToast("success", "Ride Added", "Ride added successfully.");
//         setRideDetails({
//           user_id: "",
//           bike_id: "",
//           ride_date: "",
//           day_of_week: "",
//           ride_type: "",
//           ride_day_count: "",
//           start_time: "",
//           start_km: "",
//           start_avg_mileage: "",
//           start_dte: "",
//           start_add: "",
//           end_add: "",
//           via_stops: "",
//           end_time: "",
//           end_km: "",
//           end_avg_mileage: "",
//           end_dte: "",
//           fuel_used: "",
//           balance_petrol: "",
//           dte_status: "",
//           commutation_type: "",
//           comm_time: "",
//           drive_mode: "",
//           drive_type: "",
//           remarks: "",
//         });
//       }
//     } catch (error) {
//       console.error(
//         "Error adding ride:",
//         error.response?.data || error.message
//       );
//       showToast("error", "Ride Not Added", "Failed to add the ride.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Add New Ride</Text>

//       {Object.keys(rideDetails).map((field) => (
//         <TextInput
//           key={field}
//           placeholder={field
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (c) => c.toUpperCase())}
//           value={rideDetails[field]}
//           onChangeText={(text) => handleInputChange(field, text)}
//           keyboardType={
//             field.includes("km") ||
//             field.includes("count") ||
//             field.includes("fuel")
//               ? "numeric"
//               : "default"
//           }
//           style={styles.input}
//         />
//       ))}

//       {isSubmitting ? (
//         <ActivityIndicator
//           size="large"
//           color="#0000ff"
//           style={styles.loading}
//         />
//       ) : (
//         <Button title="Add Ride" onPress={handleAddRide} />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     marginBottom: 12,
//     padding: 8,
//     fontSize: 16,
//   },
//   loading: {
//     marginVertical: 16,
//   },
// });

// export default AddRide;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/toastService";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import HeaderComponent from "../../components/HeaderComponent";
const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  editable = true,
  placeholder = "",
}) => (
  <TextInput
    style={[styles.input, !editable && styles.disabledInput]}
    placeholder={placeholder || label}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    editable={editable}
  />
);

const AddRide = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rideDetails, setRideDetails] = useState({
    ride_date: null,
    day_of_week: "",
    ride_type: "",
    ride_day_count: "",
    start_time: "",
    start_km: "",
    start_avg_mileage: "",
    start_dte: "",
    start_add: "",
    end_add: "",
    via_stops: "",
    end_time: "",
    end_km: "",
    end_avg_mileage: "",
    end_dte: "",
    fuel_used: "",
    balance_petrol: "",
    dte_status: "",
    commutation_type: "",
    comm_time: "",
    drive_mode: "",
    drive_type: "",
    remarks: "",
    user_id: null,
    bike_id: null,
  });

  const [showTimePicker, setShowTimePicker] = useState({
    field: null,
    visible: false,
  });

  useEffect(() => {
    initializeDetails();
  }, []);

  const initializeDetails = async () => {
    try {
      const storedBikeId = await AsyncStorage.getItem("bikeId");
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedBikeId || !storedUserId) {
        showToast(
          "info",
          "Incomplete Setup",
          "Please complete user and bike setup."
        );
        router.push("myBike");
        return;
      }
      setRideDetails((prev) => ({
        ...prev,
        bike_id: storedBikeId,
        user_id: storedUserId,
      }));
    } catch (error) {
      console.error("Error initializing details:", error);
      showToast(
        "error",
        "Initialization Error",
        "Failed to load user or bike details."
      );
    }
  };

  const handleInputChange = (field, value) => {
    setRideDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setRideDetails((prev) => ({ ...prev, ride_date: selectedDate }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker({ field: null, visible: false });
    if (selectedTime && showTimePicker.field) {
      const formatedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setRideDetails((prev) => ({
        ...prev,
        [showTimePicker.field]: formatedTime,
      }));
    }
  };

  const validateFields = () => {
    const requiredFields = [
      { field: "ride_date", name: "Ride Date" },
      { field: "start_time", name: "Start Time" },
      { field: "start_km", name: "Start Kilometer" },
      { field: "end_time", name: "End Time" },
      { field: "end_km", name: "End Kilometer" },
    ];

    for (let { field, name } of requiredFields) {
      if (!rideDetails[field]) {
        showToast("error", "Validation Error", `${name} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleAddRide = async () => {
    if (!validateFields()) return;

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/rides/add", rideDetails);

      if (response.status === 201) {
        showToast("success", "Ride Added", "Ride added successfully.");
        setRideDetails((prev) => ({
          ...prev,
          ride_date: null,
          day_of_week: "",
          ride_type: "",
          ride_day_count: "",
          start_time: "",
          start_km: "",
          start_avg_mileage: "",
          start_dte: "",
          start_add: "",
          end_add: "",
          via_stops: "",
          end_time: "",
          end_km: "",
          end_avg_mileage: "",
          end_dte: "",
          fuel_used: "",
          balance_petrol: "",
          dte_status: "",
          commutation_type: "",
          comm_time: "",
          drive_mode: "",
          drive_type: "",
          remarks: "",
        }));
      }
    } catch (error) {
      console.error(
        "Error adding ride:",
        error.response?.data || error.message
      );
      showToast("error", "Ride Not Added", "Failed to add the ride.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeaderComponent label="Rides" />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <InputField
            label="Ride Date"
            value={
              rideDetails.ride_date
                ? rideDetails.ride_date.toLocaleDateString()
                : ""
            }
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={rideDetails.ride_date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <InputField
          label="Day OF Week"
          value={rideDetails.day_of_week}
          onChangeText={(text) => handleInputChange("day_of_week", text)}
        />
        <InputField
          label="Ride Type"
          value={rideDetails.ride_type}
          onChangeText={(text) => handleInputChange("ride_type", text)}
        />
        <InputField
          label="Ride Day Count"
          value={rideDetails.ride_day_count}
          onChangeText={(text) => handleInputChange("ride_day_count", text)}
        />

        <TouchableOpacity
          onPress={() =>
            setShowTimePicker({ field: "start_time", visible: true })
          }
        >
          <InputField
            label="Start Time"
            value={rideDetails.start_time}
            editable={false}
          />
        </TouchableOpacity>

        <InputField
          label="Start Kilometer"
          value={rideDetails.start_km}
          onChangeText={(text) => handleInputChange("start_km", text)}
          keyboardType="numeric"
        />

        <InputField
          label="Start Avg Mileage"
          value={rideDetails.start_avg_mileage}
          onChangeText={(text) => handleInputChange("start_avg_mileage", text)}
          keyboardType="numeric"
        />

        <InputField
          label="Start DTE"
          value={rideDetails.start_dte}
          onChangeText={(text) => handleInputChange("start_dte", text)}
        />

        <InputField
          label="Start Address"
          value={rideDetails.start_add}
          onChangeText={(text) => handleInputChange("start_add", text)}
        />
        <InputField
          label="End Address"
          value={rideDetails.end_add}
          onChangeText={(text) => handleInputChange("end_add", text)}
        />

        <TouchableOpacity
          onPress={() =>
            setShowTimePicker({ field: "end_time", visible: true })
          }
        >
          <InputField
            label="End Time"
            value={rideDetails.end_time}
            editable={false}
          />
        </TouchableOpacity>

        {showTimePicker.visible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <InputField
          label="End Kilometer"
          value={rideDetails.end_km}
          onChangeText={(text) => handleInputChange("end_km", text)}
          keyboardType="numeric"
        />

        <InputField
          label="End Avg Mileage"
          value={rideDetails.end_avg_mileage}
          onChangeText={(text) => handleInputChange("end_avg_mileage", text)}
          keyboardType="numeric"
        />

        <InputField
          label="End DTE"
          value={rideDetails.end_dte}
          onChangeText={(text) => handleInputChange("end_dte", text)}
        />

        <InputField
          label="Via Stops"
          value={rideDetails.via_stops}
          onChangeText={(text) => handleInputChange("via_stops", text)}
        />

        {Object.entries(rideDetails)
          .filter(
            ([field]) =>
              ![
                "ride_date",
                "user_id",
                "bike_id",
                "ride_type",
                "day_of_week",
                "ride_day_count",
                "start_time",
                "start_km",
                "start_avg_mileage",
                "start_dte",
                "start_add",
                "end_time",
                "end_km",
                "end_avg_mileage",
                "end_dte",
                "end_add",
                "via_stops",
              ].includes(field)
          )
          .map(([field, value]) => (
            <InputField
              key={field}
              label={field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              value={value}
              onChangeText={(text) => handleInputChange(field, text)}
              keyboardType={
                field.includes("km") ||
                field.includes("count") ||
                field.includes("fuel")
                  ? "numeric"
                  : "default"
              }
            />
          ))}

        {isSubmitting ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        ) : (
          /* <Button title="Add Ride" onPress={handleAddRide} /> */
          <CustomButton
            title="Add Ride"
            handlePress={handleAddRide}
            containerStyles="w-full mt-7"
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 12,
    padding: 8,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "gray",
  },
  loading: {
    marginVertical: 16,
  },
});

export default AddRide;
