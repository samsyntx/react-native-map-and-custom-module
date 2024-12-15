import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapDirection from '../components/MapDirection';
import AppStructure from '../constant/Structure';
import { Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';


function Location() {
  const route = useRoute();
  const navigation = useNavigation();

  const {destinationCords, pickupCords} = route.params as {
    destinationCords: {latitude: number; longitude: number};
    pickupCords: {latitude: number; longitude: number};
  };
  return (
    <AppStructure>
      <MapDirection
        destinationCords={destinationCords}
        pickupCords={pickupCords}
      />
    </AppStructure>
  );
}


export default Location;
