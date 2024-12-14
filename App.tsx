import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import ChooseLocation from './src/screens/ChooseLocation';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="chooseLocation" component={ChooseLocation} />
      </Stack.Navigator>
      <FlashMessage
        position="top"
      />
    </NavigationContainer>
  );
}

export default App;
