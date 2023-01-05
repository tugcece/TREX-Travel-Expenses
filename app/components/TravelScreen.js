import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import OverView from "./OverView";
import Calculus from "./Calculus";
import MapViewDirections from "react-native-maps-directions";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const GOOGLE_API_KEY = "AIzaSyCc5YIuRs1eJf3d0f5j6N0Zp2UIhFTvZlE";

export default function TravelScreen({ route, navigation }) {
  const origincity = route.params.originCity;
  const originIATA = route.params.originIATA;
  const destinationIATA = route.params.destinationIATA;
  const destinationcity = route.params.destinationCity;
  const carPoint = route.params.point;
  const originlat = route.params.origin.lat;
  const originlng = route.params.origin.lng;
  const destinationlat = route.params.destination.lat;
  const destinationlng = route.params.destination.lng;
  const desGeo = route.params.desGeo;
  const oriGeo = route.params.oriGeo;
  const gasType = route.params.option;
  const originName = route.params.originName;
  const destinationName = route.params.destinationName;
  const [distance, setDistance] = useState("1");
  const [data, setData] = useState("a");
  const [hour, setHour] = useState("1");

  fetch(
    "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+oriGeo+"&destinations="+desGeo+"&key="+GOOGLE_API_KEY+"&language=en",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((response) => {
      setDistance(response.rows[0].elements[0].distance.value);
      setHour(response.rows[0].elements[0].duration.text);
    })
    .then(
      fetch(
        "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin="+originIATA+"&destination="+destinationIATA+"&departure_at=2022-12-28&return_at=2022-12&unique=false&sorting=price&direct=false&currency=try&limit=2&page=1&one_way=true&token=376fe450c0003ae3b6712d3d38da5bf8",
        {
          method: "GET",
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((response) => {
          setData(response.data);
        })
    )
    .catch((err) => console.error(err));

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: originlat,
    longitude: originlng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log("oprtion" + gasType);

  return (
    <View style={[styles.root]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
      >
        <MapViewDirections
          origin={{
            latitude: originlat,
            longitude: originlng,
          }}
          destination={{
            latitude: destinationlat,
            longitude: destinationlng,
          }}
          apikey={GOOGLE_API_KEY}
          strokeWidth={4}
          strokeColor={"#20BF8A"}
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
          navigation.navigate(OverView);
        }}
      >
        <Image
          style={{ marginTop: "45%", start: "20%" }}
          source={require("../assets/fast-forward.png")}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          width: "110%",
          height: "25%",
          top: "45%",
        }}
      >
        <View style={[styles.item2]}>
          <View style={[styles.info]}>
            <View style={[styles.hours]}>
              <Image
                style={{ start: "10%", top: "4%" }}
                source={require("../assets/clock3.png")}
              />
              <Text style={[styles.address]}>{hour}</Text>
              <Image
                style={{ marginStart: "25%", top: "4%" }}
                source={require("../assets/fuel2.png")}
              />
              <Text
                style={[
                  styles.address,
                  { fontSize: "30%", fontWeight: "400", top: "-5%" },
                ]}
              >
                <Calculus
                  distances={distance}
                  gasType={gasType}
                  carpoint={carPoint}
                />
              </Text>
            </View>

            <View style={[styles.roads]}>
              <Text style={[styles.address]}>{originName}</Text>
              <Image
                style={{ top: 40, right: 8 }}
                source={require("../assets/distance.png")}
              />
              <Text style={[styles.address]}>{destinationName}</Text>
            </View>
            <Text style={[styles.note]}>
              {" "}
              Calculations are made based on an ideal speed (60 km/h - 80 km/h).
              Speeding higher than this speed will cause you to spend more fuel
              and increase the price.
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: "110%",
            zIndex: 1,
            width: "100%",
            height: "105%",
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={[styles.requestoptions]}>
                <Image
                  source={require("../assets/thy.png")}
                  style={[styles.icon]}
                />
                <View style={[styles.location]}>
                  <Text style={{ fontSize: "20%", fontWeight: "900" }}>
                    {item.origin_airport}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10%",
                      fontWeight: "200",
                      right: "130%",
                      top: "15%",
                    }}
                  >
                    {origincity}
                  </Text>
                  <Image
                    style={{ right: "40%" }}
                    source={require("../assets/departure.png")}
                  />
                  <Text style={{ fontSize: "20%", fontWeight: "900" }}>
                    {item.destination_airport}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10%",
                      fontWeight: "200",
                      right: "130%",
                      top: "15%",
                    }}
                  >
                    {destinationcity}
                  </Text>
                </View>
                <View
                  style={{
                    fontSize: "25%",
                    fontWeight: "500",
                    position: "absolute",
                    width: "60%",
                    height: "20%",
                    left: "20%",
                    top: "15%",
                    borderBottomColor: "#20BF8A",
                    borderBottomWidth: 1,
                    position: "absolute",
                    zIndex: 1,
                    paddingLeft: "5%",
                  }}
                >
                  <Image
                    style={{ bottom: "30%", left: "5%" }}
                    source={require("../assets/plane-ticket.png")}
                  />
                  <Text
                    style={{
                      fontSize: "21%",
                      fontWeight: "500",
                      left: "20%",
                      top: "-160%",
                    }}
                  >
                    ₺{item.price / 2}
                  </Text>
                  <Image
                    style={{
                      start: "79%",
                      top: "-180%",
                      width: 10,
                      height: 10,
                    }}
                    source={require("../assets/clock3.png")}
                  />
                  <Text
                    style={{
                      fontSize: "12%",
                      fontWeight: "100",
                      left: "85%",
                      top: "-240%",
                    }}
                  >
                    {item.duration}m
                  </Text>
                </View>
                <Pressable
                  style={[styles.btn]}
                  onPress={() =>
                    Linking.openURL("https://www.aviasales.com" + item.link)
                  }
                >
                  <Image
                    style={{ marginTop: "60%", start: "20%" }}
                    source={require("../assets/fast-forward.png")}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            )}
          />
        </View>
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
    height: "100%",
    left: "8%",
    width: "85%",
    borderRadius: "30%",
    backgroundColor: "#FAFAFC",
    marginTop: "5%",
    shadowColor: "#000",
    zIndex: 2,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  requestoptions: {
    width: "85%",
    height: "75%",
    marginHorizontal: "7%",
    marginTop: "1%",
    backgroundColor: "white",
    borderRadius: "30%",
    shadowColor: "black",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: "5%",
    top: "30%",
  },
  btn: {
    width: "10%",
    height: "65%",
    position: "absolute",
    borderRadius: "5%",
    backgroundColor: "#20BF8A",
    right: "5%",
    top: "15%",
  },

  location: {
    width: "40%",
    flexDirection: "row",
    left: "110%",
  },
  price: {
    width: "30%",
    height: "10%",
    backgroundColor: "#20BF8A",
    marginVertical: "-33%",
    marginHorizontal: "38%",
    backgroundColor: "blue",
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
    padding: "3%",
  },
  hours: {
    height: "27%",
    flexDirection: "row",
    marginVertical: "30%",
    marginTop: "-2%",
    borderBottomColor: "#20BF8A",
    borderBottomWidth: 1,
  },
  note: {
    fontWeight: "100",
    fontSize: 6,
  },
});
