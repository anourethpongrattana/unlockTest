import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";

import { ThemedText } from '@/components/ThemedText';

export function GetProButton() {

  return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("getProScreen")}
      >
        <Ionicons name='star' size={17}/><ThemedText style={styles.text}>Get pro</ThemedText>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    lineHeight: 22,
    color: '#000'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7D9A1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    gap: 8
  },
});
