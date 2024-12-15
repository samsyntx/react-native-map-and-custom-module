import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import AppStructure from '../constant/Structure';
import {scaleSize} from '../utils/scaleSize';
import LocationSearch from '../components/LocationSearch';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

type LocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'location'
>;

interface propTypes {
  userLocation: {longitude: number; latitude: number} | null;
}

function ChooseLocation(props: propTypes) {
  const navigation = useNavigation<LocationScreenNavigationProp>();

  const {userLocation} = props;

  const [address, setAddress] = useState({
    pickupCords: {latitude: 0, longitude: 0},
    destinationCords: {latitude: 0, longitude: 0},
  });

  const {pickupCords, destinationCords} = address;

  const fetchDestinationAddress = (lat: number, lng: number): void => {
    setAddress({
      ...address,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const fetchPickupAddress = (lat: number, lng: number): void => {
    setAddress({
      ...address,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const handleViewMap = () => {
    if (
      pickupCords.latitude === 0 ||
      pickupCords.longitude === 0 ||
      destinationCords.latitude === 0 ||
      destinationCords.longitude === 0
    ) {
      Toast.show({
        text1: 'Fields Required',
        text2: 'Please select both pickup and destination locations',
        type: 'error',
        visibilityTime: 1500,
      });
      return;
    }

    navigation.navigate('location', {
      pickupCords: pickupCords,
      destinationCords: destinationCords,
    });
  };

  const renderItem = ({item}: any) => (
    <LocationSearch
      placeholder={item.placeholder}
      fetchAddress={item.id === "1" ?fetchPickupAddress : fetchDestinationAddress}
    />
  );

  const locations = [
        {
          id: '1',
          placeholder: 'Choose pickup location',
        },
        {id: '2', placeholder: 'Choose destination'},
      ];

  return (
    <AppStructure>
      <View style={styles.container}>
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContainer}
        />
        <Button onPress={handleViewMap} text="Submit" />
        {userLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.currentLocation}>Current Location:</Text>
            <Text>Latitude: {userLocation.latitude} </Text>
            <Text>Longitude: {userLocation.longitude}</Text>

            <Text style={styles.infoText}>*Current Location refreshes after every 10 mins</Text>
          </View>
        )}
      </View>
    </AppStructure>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scaleSize(15),
  },
  listContainer: {
    paddingBottom: scaleSize(15),
  },
  locationContainer:{
    marginVertical: scaleSize(20),
  },
  currentLocation: {
    fontSize: scaleSize(22),
    fontWeight: '600',
    color: '#c34081',
  },
  infoText:{
    fontSize: scaleSize(13),
    marginBottom:scaleSize(5),
    marginTop:scaleSize(2),
    color:'#157b15c9'
  }
});

export default ChooseLocation;
