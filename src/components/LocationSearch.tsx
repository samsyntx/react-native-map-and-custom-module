import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {scaleSize} from '../utils/scaleSize';

interface LocationSearchProps {
  placeholder: string;
  fetchAddress: (lat: number, lng: number) => void;
}

function LocationSearch({placeholder, fetchAddress}: LocationSearchProps) {
  const handleLocation = (data: any, details: any) => {
    if (details && details.geometry && details.geometry.location) {
        const lat = details.geometry.location.lat; 
        const lng = details.geometry.location.lng; 
        fetchAddress(lat, lng);
    } else {
        console.error('Location details are not available');
    }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeholder}
        onPress={handleLocation}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textContainerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainerStyle: {
    marginVertical: scaleSize(5),
  },
  textInputStyle: {
    height: scaleSize(40),
    color: '#000',
    fontSize: scaleSize(16),
    backgroundColor: '#f0f0f0',
  },
});

export default LocationSearch;
