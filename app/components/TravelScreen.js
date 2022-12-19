import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import SearchScreen from "./SearchScreen";

const text = ">";
const { width, height } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyCc5YIuRs1eJf3d0f5j6N0Zp2UIhFTvZlE";

export default function TravelScreen({ route, navigation }) {
  const originlat = route.params.origin.lat;
  const originlng = route.params.origin.lng;
  const destinationlat = route.params.destination.lat;
  const destinationlng = route.params.destination.lng;
  const desGeo = route.params.desGeo;
  const oriGeo = route.params.oriGeo;
  const option = route.params.option;
  const [data, setData] = useState([]);
  const [aa, setaa] = useState("");
  //console.log(data);
  fetch(
    "https://mps.googleapis.com/maps/api/distancematrix/json?origins=" +
      oriGeo +
      "&destinations=" +
      desGeo +
      "&key=" +
      GOOGLE_API_KEY,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((response) => {
      // setoriAddress(response.origin_addresses);
      // setdesAddress(response.destination_addresses);
      //  setDistance(response.rows[0].elements[0].distance.text);
      setaa(response.rows[0].elements[0].duration);
    })
    .catch((err) => console.error(err));
  console.log(aa);
  /*  fetch(
    "'https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival='+destination+'&date_departure=2022-11-15&location_departure='+origin+'&sort_order=PRICE&number_of_stops=1&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9fd9598a03msha30b93fc06019d6p1fe1efjsna67587cc9f26",
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      setData(response.airlines);
    })
    .catch((err) => console.error(err));
  ]);*/

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: originlat,
    longitude: originlng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log("sonuçlar");
  console.log(originlat);
  console.log(originlng);
  console.log(destinationlat);
  console.log(desGeo + oriGeo);
  console.log(option);

  return (
    <View style={[styles.root]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
      >
        <Polyline
          coordinates={[
            {
              latitude: originlat,
              longitude: originlng,
            },
            {
              latitude: destinationlat,
              longitude: destinationlng,
            },
          ]}
          strokeColor="#000"
          strokeColors={["black"]}
          strokeWidth={6}
        />
        <Marker
          coordinate={{
            latitude: originlat,
            longitude: originlng,
          }}
        />
        <Marker
          coordinate={{
            latitude: destinationlat,
            longitude: destinationlng,
          }}
        />
      </MapView>
      <TouchableOpacity
        style={{
          height: "1%",
          width: "10%",
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "80%",
          marginTop: "15%",
          start: "85%",
        }}
        onPress={() => {
          navigation.navigate(SearchScreen);
        }}
      >
        <Image
          style={{ marginTop: "45%", start: "20%" }}
          source={require("../assets/fast-forward.png")}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={[styles.item2]}>
        <View style={[styles.info]}>
          <View style={[styles.hours]}>
            <Image
              style={{ start: "10%", top: "5%" }}
              source={require("../assets/clock3.png")}
            />
            <Text style={[styles.address]}>1 hour 14 mins</Text>
            <Image
              style={{ marginStart: "25%", top: "5%" }}
              source={require("../assets/fuel2.png")}
            />
            <Text
              style={[
                styles.address,
                { fontSize: "30%", fontWeight: "400", top: "-2%" },
              ]}
            >
              $560
            </Text>
          </View>

          <View style={[styles.roads]}>
            <Text style={[styles.address]}>
              Kurtuluş, Adnan Menderes Blv. 98 B, 09020 Aydin Merkez/Aydin,
              Turkey
            </Text>
            <Image
              style={{ top: 40 }}
              source={require("../assets/distance.png")}
            />
            <Text style={[styles.address]}>
              Alsancak, 1460. Sk. No:8, 35220 Konak/İzmir, Turkey
            </Text>
          </View>
          <Text style={[styles.note]}>
            {" "}
            Calculations are made based on an ideal speed (60 km/h - 80 km/h).
            Speeding higher than this speed will cause you to spend more fuel
            and increase the price.
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={[styles.requestoptions, { marginTop: "15%" }]}>
              <Image
                source={require("../assets/fuel-pump.png")}
                style={[styles.icon]}
              />
              <View style={[styles.location]}>
                <Text style={{ fontSize: "15%", fontWeight: "900" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: "15%", fontWeight: "900" }}>
                  {" "}
                  ---{" "}
                </Text>
                <Text style={{ fontSize: "15%", fontWeight: "900" }}>
                  {item.name}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: "25%",
                  fontWeight: "500",
                  textAlign: "center",
                  marginHorizontal: "38%",
                  marginVertical: "30%",
                  width: "30%",
                  height: "20%",
                  zIndex: 1,
                }}
              >
                1238,95
              </Text>
              <View style={[styles.price]}></View>
              <Pressable style={[styles.btn]}>
                <Text style={[styles.btntext]}>{text}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  item2: {
    height: "25%",
    width: "90%",
    borderRadius: "30%",
    backgroundColor: "#FAFAFC",
    marginTop: "130%",
    position: "absolute",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  requestoptions: {
    width: "90%",
    height: "30%",
    marginHorizontal: "5%",
    marginVertical: "2%",
    backgroundColor: "white",
    borderRadius: "15%",
    shadowColor: "black",
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  icon: {
    marginVertical: "8%",
    marginHorizontal: "3%",
  },
  btn: {
    width: "8%",
    height: "75%",
    borderRadius: "5%",
    backgroundColor: "#20BF8A",
    marginStart: "87%",
    marginVertical: "11%",
  },
  btntext: {
    textAlign: "center",
    marginVertical: "120%",
    fontSize: "15%",
    fontWeight: "700",
    color: "white",
  },
  location: {
    fontSize: "15%",
    fontWeight: "700",
    width: "40%",
    marginHorizontal: "35%",
    marginVertical: "-25%",
    flexDirection: "row",
  },
  price: {
    width: "30%",
    height: "10%",
    backgroundColor: "#20BF8A",
    marginVertical: "-33%",
    marginHorizontal: "38%",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  roads: {
    flex: 1,
    flexDirection: "row",
    marginTop: "-25%",
  },
  address: {
    flex: 1,
    flexDirection: "column",
    marginTop: "3%",
    padding: "4%",
    width: 200,
  },
  info: {
    width: "100%",
    height: "100%",
    padding: "4%",
  },
  hours: {
    height: "25%",
    flexDirection: "row",
    marginVertical: "30%",
    marginTop: "-2%",
    borderBottomColor: "#20BF8A",
    borderBottomWidth: 1,
  },
  note: {
    fontWeight: "100",
    fontSize: 10,
  },
});
