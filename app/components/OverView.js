import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";


const GOOGLE_API_KEY = "Google APi Key";//Google API Key'inizi yazarak çalıştırabilirsiniz.
const viewheight = 390;
const viewwidth = 315;
const currency = 19;

function OverView({ route, navigation }) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [price, setPrice] = useState([]);

  const ASPECT_RATIO = viewwidth / viewheight;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 37.74587650000001,
    longitude: 29.1082623,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  fetch(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.739787,29.101539&rankby=distance&type=gas_station&key="+GOOGLE_API_KEY,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((response) => {
      setData(response.results[0].geometry.location.lat);
      setData2(response.results[0].geometry.location.lng);
    })
    .catch((err) => console.error(err));
  fetch("https://api.collectapi.com/gasPrice/fromCity?city=istanbul", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "apikey",//collect api gas prices api key değerini giriniz.
    },
  })
    .then((response) => response.json())
    .then((response) => {
      setPrice(response.result);
    })
    .catch((err) => console.error(err));
  console.log(price);
  return (
    <View style={styles.root}>
      <View style={[styles.item]}>
        <ImageBackground
          style={{ flex: 1, top: "-10%" }}
          source={require("../assets/bckgrnd.png")}
          resizeMode="cover"
        />
        <Text style={[styles.welcome]}>Welcome Back!</Text>
      </View>
      <View style={[styles.item2]}>
        <Text style={[styles.header, { marginTop: "3%", marginBottom: "4%" }]}>
          {" "}
          Fuel Prices{" "}
        </Text>
        <View style={[styles.fuel]}>
          <View style={[styles.fueltypes]}>
            <Text style={[styles.fuelprice]}>₺{price.gasoline * currency}</Text>
            <Text style={[styles.fueltext, { marginStart: "30%" }]}>
              Gasoline
            </Text>
            <Image
              source={require("../assets/yellowchart.png")}
              style={[styles.fuelimage]}
            />
          </View>
          <View style={[styles.fueltypes]}>
            <Text style={[styles.fuelprice]}>₺{price.diesel * currency}</Text>
            <Text style={[styles.fueltext, { marginStart: "35%" }]}>
              Diesel
            </Text>
            <Image
              source={require("../assets/orangechart.png")}
              style={[styles.fuelimage]}
            />
          </View>
          <View style={[styles.fueltypes]}>
            <Text style={[styles.fuelprice]}>₺{price.lpg * currency}</Text>
            <Text style={[styles.fueltext, { marginStart: "40%" }]}>Lpg</Text>
            <Image
              source={require("../assets/purplechart.png")}
              style={[styles.fuelimage]}
            />
          </View>
        </View>

        <Text style={[styles.header, { marginTop: "4%" }]}>
          {" "}
          Closest Gas Station{" "}
        </Text>
        <View style={[styles.view]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_POSITION}
            style={{ flex: 1, zIndex: 5 }}
          >
            <Marker
              coordinate={{
                latitude: {data},
                longitude:{data2},
              }}
            />
          </MapView>
        </View>
      </View>
    </View>
  );
}
export default OverView;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  item: {
    height: "30%",
    width: "100%",
    backgroundColor: "black",
  },
  item2: {
    height: "85%",
    width: "100%",
    borderRadius: "30%",
    backgroundColor: "#FAFAFC",
    zIndex: 1,
    marginTop: "-35%",
  },

  avatar: {
    height: "37%",
    width: "20%",
    borderRadius: 40,
    marginTop: "15%",
    marginStart: 25,
  },
  welcome: {
    marginLeft: "27%",
    marginTop: "-27%",
    color: "white",
    fontSize: "20%",
    letterSpacing: "4%",
    flex: 1,
  },

  header: {
    marginLeft: 30,
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: "900",
    fontSize: "22%",
  },

  fuel: {
    width: "80%",
    height: "12%",
    flexDirection: "row",
    marginHorizontal: "10%",
  },
  fueltypes: {
    backgroundColor: "white",
    height: "100%",
    width: "30%",
    borderRadius: "10%",
    marginEnd: "5%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  view: {
    width: viewwidth,
    height: viewheight,
    borderRadius: "10%",
    backgroundColor: "white",
    marginVertical: "2%",
    marginHorizontal: "10%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  fuelimage: {
    width: "100%",
    height: "35%",
    marginTop: "-10%",
  },
  fueltext: {
    width: "100%",
    height: "30%",
    fontWeight: "100",
    fontSize: "11%",
    // marginTop:'10%',
  },
  fuelprice: {
    width: "100%",
    height: "30%",
    marginVertical: "6%",
    fontSize: "20%",
    marginHorizontal: "15%",
  },
});
