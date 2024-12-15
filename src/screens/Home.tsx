import React from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import AppStructure from "../constant/Structure";
import MapDirection from "../components/MapDirection";
import { scaleSize } from "../utils/scaleSize";
import ChooseLocation from "../layouts/ChooseLocation";

function Home() {
  return (
    <AppStructure>
      <ChooseLocation />
    </AppStructure>
  );
}


export default Home;

