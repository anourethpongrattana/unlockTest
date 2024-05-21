import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedText } from '@/components/ThemedText';

interface micButtonType {
    micIs: boolean;
    micIsTrigger: (event: GestureResponderEvent) => void
}

export function MicButton(props: micButtonType) {
  return (
    <TouchableOpacity style={[styles.iconContainerBackground, props.micIs ? {backgroundColor: "#62BE64"} : {backgroundColor: "#F7D9A1"}]} onPress={props.micIsTrigger}>
    <View style={styles.iconContainer}>
      <ThemedText style={{ lineHeight: 32}}><Ionicons name={props.micIs ? "mic-outline": "mic-off-outline"} size={32} /></ThemedText>
    </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainerBackground: {
    width: 192,
    height: 192,
    borderRadius: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 172,
    height: 172,
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 86,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
});