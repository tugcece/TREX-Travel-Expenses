import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";

const viewheight = 190;
const viewwidth = 315;
const Chart = () => {
  return (
    <>
      <StackedBarChart
        data={{
          legend: ["Gasoline", "Diesel", "LPG"],
          data: [
            [100],
            [30],
            [40],
          ],
          barColors: ["#ebc337", "#e5944e", "#3f48cc"],
          
        }}
        width={315}
        height={190}
        chartConfig={{
         
          borderRadius:'20%',
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: '50%',
            
          },
        }}
        style={[styles.graph]}
      />
    </>
  );
};

export default Chart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  graph:{
    width: viewwidth,
    height: viewheight,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  }
});
