import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GetProButton } from "@/components/GetProButton";
import { MicButton } from "@/components/MicButton";
import { TuneSelectButton } from "@/components/TuneSelectButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BottomSheetTab } from "@/components/BottomSheetTab";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedViewProps } from "@/components/ThemedView";

export default function HomeScreen({lightColor, darkColor }: ThemedViewProps) {
  const bgItem = useThemeColor({ light: lightColor, dark: darkColor }, 'bgItem');
  const [micIs, setMicIs] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          <Text>Voice</Text>
          <ThemedText type="titleBold">Morph</ThemedText>
        </ThemedText>
        <GetProButton />
      </ThemedView>
      <ThemedView style={styles.bodyContainer}>
        <MicButton micIs={micIs} micIsTrigger={() => setMicIs(!micIs)} />
        <ThemedText style={{ fontSize: 12 }}>
          Tap to turn {micIs ? `OFF` : `ON`} microphone
        </ThemedText>
        <TuneSelectButton />
      </ThemedView>
      <BottomSheetTab />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    marginBottom: 8
  }
});
