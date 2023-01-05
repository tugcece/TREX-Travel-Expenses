import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import OverView from "./OverView";
import TravelScreen from "./TravelScreen";
import SearchScreen from "./SearchScreen";
import CarsScreen from "./CarsScreen";
import Chart from "./Chart";



const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowOffset: {
        width: 10,
        height: 10,
      },
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 35,
        backgroundColor: "#20BF8A",
        marginRight: "40%",
      }}
    >
      <Image
        source={require("../assets/menu.png")}
        resizeMode="contain"
        style={{
          width: "125%",
          height: "135%",
          margin: "-5%",

        }}
      />
    </View>
  </TouchableOpacity>
);

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: "3%",
          marginHorizontal: "9%",
          height: "7%",
          elevation: 0,
          borderRadius: "15%",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: {
            width: 5,
            height: 5,
          },
        },
      }}
    >
     <Tab.Screen
        name="CarsScreen"
        component={CarsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIconStyle: { display: "none" ,  marginRight: "110%",},
        }}
      />
      <Tab.Screen
        name="OverView"
        component={OverView}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{
                marginTop: "75%",
                marginRight:'-100%',
                width: 30,
                height: 30,
                tintColor: focused ? "#20BF8A" : "#B3B8BD",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TravelScreen"
        component={TravelScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIconStyle: { marginLeft: "350%", backgroundColor:'red' },
        }}
      />
      <Tab.Screen
        name="Chart"
        component={Chart}
        options={{
          tabBarButton: (...props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/search.png")}
              resizeMode="contain"
              style={{
                marginTop: "75%",
                marginRight: "250%",
                width: 35,
                height: 35,
                tintColor: focused ? "#20BF8A" : "#B3B8BD",
              }}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
