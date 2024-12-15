import React, {useEffect, useState} from 'react';
import AppStructure from '../constant/Structure';
import ChooseLocation from '../layouts/ChooseLocation';
import {getCurrentLocation, locationPermission} from '../utils/location';
import Toast from 'react-native-toast-message';

function Home() {
  const [liveLocation, setLiveLocation] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locPermission = await locationPermission();
        if (locPermission === 'granted') {
          const {latitude, longitude}: {latitude: number; longitude: number} =
            (await getCurrentLocation()) as {latitude: number; longitude: number};

          setLiveLocation({latitude, longitude});
        } else {
          console.log('Location Permission denied');
          Toast.show({
            text1: 'Location permission denied',
            text2: 'You may need to select a pickup location manually.',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error getting location:', error);
        Toast.show({
          text1: 'Location permission denied',
          text2: 'You may need to select a pickup location manually.',
          type: 'error',
        });
      }
    };

    fetchLocation();

    const intervalId = setInterval(fetchLocation, 10 * 60 * 1000); 

    
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <AppStructure>
      <ChooseLocation
        userLocation={liveLocation}
      />
    </AppStructure>
  );
}

export default Home;
