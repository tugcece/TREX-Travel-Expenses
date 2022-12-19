import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

const spacing = "5%";
export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (key) => {
    onSelect(key);
    setUserOption(key);
  };
  return (
    <View style={[styles.root]}>
      {data.map((item) => {
        return (
          <Pressable onPress={() => selectHandler(item.key)}>
            <View
              style={
                item.key === userOption ? styles.selected : styles.unselected
              }
            >
              <Image
                source={require("../assets/leaf.png")}
                style={[styles.fuelimage]}
              />
              <Text style={[styles.fuelText]}>{item.value}</Text>
            </View>
          </Pressable>
         
        );
      })}

    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    width: "60%",
    marginHorizontal: "8%",
    marginVertical:'37%',
    top:-140
  },
  unselected: {
    backgroundColor: "white",
    zIndex: 2,
    flex: 1,
   // marginVertical:67,
    borderRadius: "15%",
    marginLeft: spacing,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  fuelText: {
    marginHorizontal: "10%",
    fontWeight: "200",
    fontSize: "20%",
    marginTop: "-3%",
  },
  fuelimage: {
    marginTop: "-10%",
  },
  selected: {
    backgroundColor: "red",
  },
  selected: {
    backgroundColor: "#20BF8A",
    zIndex: 2,
    flex: 1,
   // marginVertical:67,
    borderRadius: "15%",
    marginLeft: spacing,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
});
