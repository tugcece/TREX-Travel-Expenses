import React, { useState } from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import vwcars from "./CarTypes";
const ITEM_SIZE = 120;

function CarsScreen({ navigation }) {
   const temp = 1; 
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden />
      <View style={[styles.bar]}>  
        <ImageBackground
        style={{flex:1}}
          source={require("../assets/carRoad.png")}
          resizeMode="cover"
        />
         <Text style={[styles.welcome]}>Choose Your Car!</Text>
      </View>
      <View style={[styles.bar3]}>
        <FlatList
          data={vwcars}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              console.log(item),
                <TouchableOpacity
                  onPress={() => {navigation.navigate("SearchScreen", {item} , temp )}}
                >
                  <View style={styles.item}>
                    <View>
                      <Text style={styles.model}>{item.model}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}
export default CarsScreen;

const styles = StyleSheet.create({
  bar: {
    height: "35%",
    width: "100%",
    marginTop: "-15%",

    zIndex:1
  },

  bar3: {
    height: "95%",
    width: "100%",
    borderRadius: "20%",
    backgroundColor: "#ffffff", // "#FFFAEB"
    marginTop: "-25%",
    zIndex: 1,
    paddingVertical: "10%",
  },
  item: {
    height: ITEM_SIZE,
    borderRadius: 9,
    marginBottom: 15,
    marginHorizontal: "10%",
    backgroundColor: "#F6F7F8",
    zIndex: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  model: {
    marginTop: "15%",
    marginHorizontal: "10%",
    fontWeight: "900",
    fontSize: "20%",
  },
  description: {
    marginTop: "7%",
    marginHorizontal: "10%",
    fontSize: 12,
    opacity: 0.7,
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: "-35%",
    zIndex: 1,
    resizeMode: "center",
  },
  bImage: {
    width: "100%",
    height: "90%",
  },
  header: {
    marginLeft: 20,
    marginTop: -20,
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: "900",
    fontSize: "22%",
  },
  backButton: {
    width: 500,
    height: 100,
    marginTop: "20%",
    marginLeft: "10%",
    color: "red",
    position: "absolute",
  },
  welcome: {
    marginLeft: "27%",
    marginTop: "-27%",
    color: "white",
    fontSize: "20%",
    letterSpacing: "4%",
    flex: 1,
  },
});
