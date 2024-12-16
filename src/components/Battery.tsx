import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';

const { BatteryOptimization } = NativeModules;

const Battery = () => {
  const [isBatterySaverOn, setIsBatterySaverOn] = useState(false);

  useEffect(() => {
    if (BatteryOptimization) {
      BatteryOptimization.isBatteryOptimized((status: boolean | ((prevState: boolean) => boolean)) => {
        setIsBatterySaverOn(status);
      });
    } else {
      console.error("BatteryOptimization module is not available.");
    }
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Optimization Status</Text>
      <Text style={styles.status}>
        {isBatterySaverOn ? 'Battery Saver Mode is ON' : 'Battery Saver Mode is OFF'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Battery;
