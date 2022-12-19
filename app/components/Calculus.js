import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const GOOGLE_API_KEY = "AIzaSyCmDwnqi7W8fqlyvGdMMM9eLXQOggNONAc";

export default  function Calculus({ origeo, desgeo, fueltype, point }) {
  const [oriAddress, setoriAddress] = useState("");
  const [desAddress, setdesAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [aa, setaa] = useState("");
  const [origin, setOrigin] = useState(origeo);
  const [destination, setDestination] = useState(desgeo);
  const litresPerKM = 10 / 100;
  const gasLitreCoast = 200;
  const carPoint = 2;
  const litreCoastKm = litresPerKM * gasLitreCoast * carPoint;
  
   fetch(
     "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origeo+"&destinations="+desgeo+"&key="+GOOGLE_API_KEY,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((response) => {
      setoriAddress(response.origin_addresses);
      setdesAddress(response.destination_addresses);
      setDistance(response.rows[0].elements[0].distance.text);
      setaa(response.rows[0].elements[0].duration);
    })
    .catch((err) => console.error(err));
  const cost = Math.floor(100 * litreCoastKm);
  return (
    <View style={styles.container}>
      <Text style={styles.advice}>Kurtuluş, Adnan Menderes Blv. 98 B, 09020 Aydin Merkez/Aydin, Turkey</Text>
      <Text style={styles.advice}>Alsancak, 1460. Sk. No:8, 35220 Konak/İzmir, Turkey</Text>
      <Text style={styles.advice}>{cost}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  advice: {
    fontSize: 10,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
