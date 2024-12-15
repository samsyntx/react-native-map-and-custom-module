import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import AppStructure from '../constant/Structure';
import {scaleSize} from '../utils/scaleSize';
import LocationSearch from '../components/LocationSearch';
import Button from '../components/Button';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';


type LocationScreenRouteProp = RouteProp<RootStackParamList, 'location'>;

function ChooseLocation() {
  const navigation = useNavigation<LocationScreenRouteProp>();

  const [address, setAddress] = useState({
    pickupCords: {},
    destinationCords: {},
  });

  const {pickupCords, destinationCords} = address;

  const locations = [
    {id: '1', placeholder: 'Choose pickup location'},
    {id: '2', placeholder: 'Choose destination'},
  ];

  const fetchPickupAddress = (lat: number, lng: number): void => {
    setAddress({
      ...address,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const fetchDestinationAddress = (lat: number, lng: number): void => {
    setAddress({
      ...address,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const handleViewMap = () => {
    const handleViewMap = () => {
      navigation.navigate('location', {
        pickupCords: pickupCords,
        destinationCords: destinationCords,
      });
    };
  };

  const renderItem = ({item}: any) => (
    <LocationSearch
      placeholder={item.placeholder}
      fetchAddress={
        item.id === '1' ? fetchPickupAddress : fetchDestinationAddress
      }
    />
  );

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
});

export default ChooseLocation;
