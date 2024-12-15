import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {scaleSize} from '../utils/scaleSize';

interface btnProps {
  text: string;
  style?: ViewStyle | ViewStyle[]; 
  onPress?: () => void;
}

function Button({text, style, onPress}: btnProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor:'hotpink',
    paddingHorizontal: scaleSize(16),
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(15)
  },
  textStyle:{
    fontWeight:'600',
    fontSize:scaleSize(18),
  }
});

export default Button;
