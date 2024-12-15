import React, {useState, useCallback, useRef} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import MapView, {Marker, MapViewProps, Region} from 'react-native-maps';
import path from '../constant/path';
import {GOOGLE_MAPS_API_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';
import {scaleSize} from '../utils/scaleSize';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const containerStyle = {
  width: width,
};

interface directionProps {
  destinationCords: {latitude: number; longitude: number};
  pickupCords: {latitude: number; longitude: number};
}

function MapDirection({destinationCords, pickupCords}: directionProps) {
  const [destination, setDestination] = useState({
    pickupChords: {
      latitude: pickupCords?.latitude,
      longitude: pickupCords?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: destinationCords?.latitude,
      longitude: destinationCords?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const {pickupChords, droplocationCords} = destination;

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
        onMapReady={() => onMapReady(map!)}>
        <Marker coordinate={pickupChords}>
          <Image
            source={require('../assets/images/greenpin.png')}
            style={styles.pickupImage}
            alt='pickup'
            resizeMode='contain'
          />
        </Marker>

        <Marker coordinate={droplocationCords} />

        <MapViewDirections
         optimizeWaypoints={true}
        key={`${pickupCords.latitude}-${pickupCords.longitude}-${droplocationCords.latitude}-${droplocationCords.longitude}`}
          origin={pickupChords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="hotpink"
          onError={errorMessage => {
            if (errorMessage.includes('ZERO_RESULTS')) {
              Toast.show({
                text1: 'No route found',
                text2: 'Please check the destination and try again.',
                type: 'error',
              });
              console.log('No route found:', errorMessage);
            } else {
              console.log('Other error:', errorMessage);
              Toast.show({
                text1: 'No route found',
                text2: 'Please check the destination and try again.',
                type: 'error',
              });
            }
          }}
          onReady={result => {
            if (mapRef.current) {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {top: 30, right: 30, bottom: 30, left: 30},
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
    flex: 1,
  },
  pickupImage: {
    height: 50,
    width: 50,
    opacity:0.9
  },
});

export default MapDirection;
