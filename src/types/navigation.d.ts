export type RootStackParamList = {
  home: undefined; 
  location: { 
    pickupCords: { 
      latitude: number; 
      longitude: number 
    }; 
    destinationCords: { 
      latitude: number; 
      longitude: number 
    }; 
  }; 
};