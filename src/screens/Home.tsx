import React, { useState, useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, MapViewProps, Region } from "react-native-maps";
import {GOOGLE_MAPS_API_KEY} from '@env'
import MapViewDirections from "react-native-maps-directions";

const { width } = Dimensions.get("window");

const containerStyle = {
  width: width,
};

function Home() {
    const [destination, setDestination] = useState({
        pickupChords:{
            latitude:30.7046,
            longitude:76.7179,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        droplocationCords:{ 
            latitude:30.7333,
            longitude:76.7794,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })

    const {pickupChords, droplocationCords} = destination

    const mapRef = useRef<MapView | null>(null);
    const [map, setMap] = useState<MapView | null>(null);

  const onMapReady = useCallback((map: MapView) => {
    setMap(map);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
        style={styles.map}
        initialRegion={pickupChords}
        onMapReady={() => onMapReady(map!)}
      >
        <Marker coordinate={pickupChords}/>
        <Marker coordinate={droplocationCords} />
        <MapViewDirections 
            origin={pickupChords}
            destination={droplocationCords}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={5}
            strokeColor="hotpink"
            onError={(errorMessage) => console.log("Directions Error:", errorMessage)}
            onReady={result => {
                if (mapRef.current) {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
                    animated: true,
                  });
                }
              }}              
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...containerStyle,
  flex:1
  },
});

export default Home;

