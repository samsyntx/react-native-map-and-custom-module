import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';

import FlashMessage from 'react-native-flash-message';
import 'react-native-get-random-values';
import Location from './src/screens/Location';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="location" component={Location} />
      </Stack.Navigator>
      <FlashMessage
        position="top"
      />
    </NavigationContainer>
  );
}

export default App;
