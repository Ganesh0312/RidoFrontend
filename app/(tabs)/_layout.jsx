import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001", // Color for the active tab icon
          tabBarInactiveTintColor: "#CDCDE0", // Color for the inactive tab icon
          tabBarShowLabel: true, // Show labels under icons
          tabBarStyle: {
            backgroundColor: "#363dd1", // Tab bar background color
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 50, // Tab bar height
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={focused ? size + 4 : size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="addride"
          options={{
            title: "AddRide",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "bicycle" : "bicycle-outline"} // Change icon based on focus
                color={color}
                size={focused ? size + 4 : size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={focused ? size + 4 : size}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
