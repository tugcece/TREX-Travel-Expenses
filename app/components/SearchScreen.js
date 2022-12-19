import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Cars from "./CarsScreen";
import RadioButton from "./RadioButton";
import vwradiobtn from "./RadioButtonData";

const GOOGLE_API_KEY = "AIzaSyCmDwnqi7W8fqlyvGdMMM9eLXQOggNONAc";
const spacing = "2%";

function SearchScreen({ route, navigation }) {
  const item = {
    key: "2",
    image:
      "https://img.sm360.ca/images/newcar/ca/2023/hyundai/sonata/preferred-2-5l-/sedan/main/2023_hyundai_sonata_gls_main.png",
    model: "Hybrid Car",
    point: 1,
    description: "Toyota Prius,Tesla,Hyundai Ionique Models...",
  };

  const [origin, setOrigin] = useState("Origin");
  const [destination, setDestination] = useState("Destination");
  const [desGeo, setDesGeo] = useState("DesGeo");
  const [oriGeo, setOriGeo] = useState("OriGeo");
  const [option, setOption] = useState(null);
 
  var date = new Date().getDate();
  var month = (new Date().getMonth() + 1).toLocaleString("en-us", {
    month: "long",
  });
  var year = new Date().getFullYear();
  return (
    <View style={styles.root}>
      <View style={[styles.item]}>
        <Image
          source={require("../assets/ship.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={[styles.item3]}>
        <Text style={[styles.header]}>Let's Ride!</Text>
        <View style={[styles.search]}>
          <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            placeholder="Search"
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            onPress={(data, details) => {
              setOrigin(details?.geometry?.location);
              setOriGeo(
                details?.geometry?.location.lat +
                  "%2C" +
                  details?.geometry?.location.lng
              );
            }}
            onFail={(error) => console.error(error)}
          />
        </View>
        <View style={[styles.search2]}>
          <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true} // you need this to fetch the details object onPress
            placeholder="Search"
            query={{
              key: GOOGLE_API_KEY,
              language: "en", // language of the results
            }}
            onPress={(data, details) => {
              setDestination(details?.geometry?.location);
              setDesGeo(
                details?.geometry?.location.lat +
                  "%2C" +
                  details?.geometry?.location.lng
              );
            }}
            onFail={(error) => console.error(error)}
          />
        </View>
        <Text style={[styles.header2]}>Your vehicle</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Cars);
          }}
        >
          <View style={[styles.car]}>
            <Image source={{ uri: item.image }} style={[styles.carimage]} />

            <View style={[styles.carinfo]}>
              <Text style={{ marginHorizontal: "10%", marginVertical: "6%" }}>
                {date}.{month}.{year}
              </Text>
              <Text
                style={{
                  marginVertical: "3%",
                  marginHorizontal: "15%",
                  fontWeight: "900",
                  fontSize: "20%",
                }}
              >
                {item.model}
              </Text>
              <Text style={{ marginVertical: "-5%", marginHorizontal: "15%" }}>
                {item.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <RadioButton
          style={{ flex: 1, flexDirection: "row", backgroundColor: "red" }}
          data={vwradiobtn}
          onSelect={(key) => setOption(key)}
        
        />

        <Pressable
          style={[styles.btn]}
          onPress={() =>
            navigation.navigate("TravelScreen", {
              origin: origin,
              destination: destination,
              desGeo: desGeo,
              oriGeo: oriGeo,
              option:option
            })
          }
        >
          <Text style={[styles.textbtn]}>Let's Go!</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  item: {
    height: "30%",
    width: "100%",
    backgroundColor: "#0000",
    zIndex: 1,
  },

  item3: {
    height: "70%",
    width: "100%",
    borderRadius: "30%",
    backgroundColor: "#FAFAFC",
    marginTop: "-30%",
    zIndex: 1,
    flex: 1,
  },
  search: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: "10%",
    marginTop: "15%",
    marginHorizontal: "10%",
    fontSize: "15%",
    position: "absolute",
    zIndex: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  search2: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: "10%",
    marginHorizontal: "10%",
    marginTop: "35%",
    fontSize: "15%",
    position: "absolute",
    zIndex: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  btn: {
    backgroundColor: "#20BF8A",
    borderColor: "#0000",
    top: "-32%",
    marginVertical: "-3%",
    marginHorizontal: "30%",
    borderRadius: "10%",
    flex: 1,
  },
  textbtn: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: "20%",
    justifyContent: "center",
    top: "20%",
  },
  image: {
    width: "100%",
    height: "90%",
    zIndex: 1,
  },
  car: {
    height: 120,
    borderRadius: 9,
    marginBottom: 20,
    marginHorizontal: "10%",
    marginTop: "2%",
    borderColor: "white",
    borderWidth: "0.25",
    backgroundColor: "white",
    zIndex: 1,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  header: {
    marginLeft: 30,
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: "900",
    fontSize: "22%",
    zIndex: 2,
  },
  header2: {
    marginLeft: 30,
    marginTop: "40%",
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: "900",
    fontSize: "22%",
    zIndex: 2,
  },
  carimage: {
    height: 144,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: "-35%",
    zIndex: 1,
    resizeMode: "center",
  },
  carinfo: {
    width: "49%",
    height: "100%",
  },
  carIcon: {
    width: "49%",
    height: "20%",
    marginVertical: "-10%",
  },
  fuelbar: {
    width: "80%",
    height: "20%",
    marginTop: "2%",
    marginHorizontal: "10%",
    backgroundColor: "transparent",
    borderRadius: 9,
    zIndex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fuelTypes: {
    height: "25%",
    backgroundColor: "white",
    zIndex: 2,
    flex: 1,
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
    marginTop: "-8%",
  },
  fuelimage: {
    marginTop: "-10%",
  },
  white: {
    backgroundColor: "transparent",
    marginVertical: "35%",
  },
});
/**         <TextInput
          clearButtonMode="while-editing"
          style={styles.search}
          value={origin}
          onChangeText={(origin) => setOrigin(origin)}
          placeholder={"Choose Your Location"}
        />
        <TextInput
          clearButtonMode="while-editing"
          style={styles.search2}
          value={destination}
          onChangeText={(destination) => setDestination(destination)}
          placeholder={"Choose Your Destination"}
        />
         fetch(
    "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=" +
      origin +
      "",
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
      setData(response);
    })
    .catch((err) => console.error(err));

        */
