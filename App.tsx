import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import 'react-native-get-random-values';
import { RootStackParamList } from './src/types/navigation';
import Toast from 'react-native-toast-message';
import Home from './src/screens/Home';
import Location from './src/screens/Location';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
        <Stack.Screen  name="location" component={Location} />
      </Stack.Navigator>
      <Toast autoHide={true} position="top" topOffset={10} />
    </NavigationContainer>
  );
}

export default App;
