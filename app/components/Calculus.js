import { useState } from "react";
import { Text } from "react-native";

var gasLitreCost = 0;
const currency = 19;

export default function Calculus({ distances, gasType, carpoint }) {
  const [diesel, setDiesel] = useState([]);
  const [gasoline, setGasoline] = useState([]);
  const [lpg, setLpg] = useState([]);
  const litresPerKM = 10 / 100;
  fetch("https://api.collectapi.com/gasPrice/fromCity?city=istanbul", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "apikey 6uihXXG9EmAQCbsqlYyeMU:2RylOQyFvktsMKDIG8SVwl",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      setGasoline(response.result.gasoline);
      setDiesel(response.result.diesel);
      setLpg(response.result.lpg);
    })
    .catch((err) => console.error(err));
  if (gasType == "gasoline") {
    gasLitreCost = gasoline;
    console.log("gasoline" + gasoline);
  } else if (gasType == "lpg") {
    gasLitreCost = lpg;
    console.log(lpg);
  } else {
    gasLitreCost = diesel;
    console.log("diesel" + diesel);
  }
  console.log("litresperkm" + litresPerKM);
  console.log("gasLitrecost" + gasLitreCost);
  console.log("carpoint" + carpoint);
  console.log("distancesdistance" + distances);
  const litreCostKm = litresPerKM * gasLitreCost * carpoint * currency;
  const cost = Math.floor((distances / 1000) * litreCostKm);
  return <Text>₺{cost}</Text>;
}
