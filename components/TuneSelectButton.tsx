import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedViewProps } from "@/components/ThemedView";

export function TuneSelectButton({lightColor, darkColor }: ThemedViewProps) {
  const bgItem = useThemeColor({ light: lightColor, dark: darkColor }, 'bgItem');

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: bgItem}]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Image
          source={{ uri: "https://example.com/profile.jpg" }}
          style={styles.image}
        />
        <ThemedText>Autotune</ThemedText>
      </View>
      <Ionicons name="chevron-down-outline" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 195,
    marginTop: 20,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
