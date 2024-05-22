import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { RadioButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView, ThemedViewProps } from "@/components/ThemedView";

import { getArtistes, type Artiste } from "@/api/artistes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function getProModalScreen({lightColor, darkColor }: ThemedViewProps) {
  const [subscriptionType, setSubscriptionType] = useState("weekly");
  const bgItem = useThemeColor({ light: lightColor, dark: darkColor }, 'bgItem');

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["artistes"], queryFn: getArtistes });

  // Mutations
  const mutation = useMutation({
    mutationFn: getArtistes,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["artistes"] });
    },
  });

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          left: 20,
          backgroundColor: bgItem,
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          top: Platform.OS === 'ios' ? 0: 50,
          zIndex: 999
        }}
      >
        <ThemedText><Ionicons name="close-outline" size={17} /></ThemedText>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          {query.data && query.data.slice(0, 7).map((_: Artiste, index: number) => (
            <Image
              key={index}
              source={{ uri: _.url }}
              style={styles.circleImage}
            />
          ))}
        </View>
        <View style={styles.imageContainer2}>
          {query.data && query.data.slice(8, 16).map((_: Artiste, index: number) => (
            <Image
              key={index}
              source={{ uri: _.url }}
              style={styles.circleImage}
            />
          ))}
        </View>
        <View style={styles.imageContainer3}>
          {query.data && query.data.slice(17, 25).map((_: Artiste, index: number) => (
            <Image
              key={index}
              source={{ uri: _.url }}
              style={styles.circleImage}
            />
          ))}
        </View>
        <ThemedText style={styles.title}>
          Try <ThemedText style={styles.subTitle}>Voice</ThemedText>Morph pro
        </ThemedText>
        <ThemedText style={styles.description}>
          Sync your iPhone to any speaker via Bluetooth, enhance with effects,
          and command the crowd.
        </ThemedText>
        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(value) => setSubscriptionType(value)}
            value={subscriptionType}
          >
            <TouchableOpacity style={[styles.radioButton, {backgroundColor: bgItem}]} onPress={() => setSubscriptionType("weekly")}>
              <RadioButton value="weekly" color="#F7D9A1" />
              <View style={styles.radioTextContainer}>
                <ThemedText style={styles.radioLabel}>Weekly</ThemedText>
                <ThemedText style={styles.radioLabelPrice}>$5.99/week</ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.radioButton, {backgroundColor: bgItem}]} onPress={() => setSubscriptionType("annually")}>
              <RadioButton value="annually" color="#F7D9A1" />
              <View style={styles.radioTextContainer}>
                <ThemedText style={styles.radioLabel}>Annually</ThemedText>
                <ThemedText style={styles.radioLabelPrice}>$2.99/week</ThemedText>
              </View>
            </TouchableOpacity>
          </RadioButton.Group>
        </View>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Try It Free</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  imageContainer: {
    flexDirection: "row",
    marginLeft: -50,
    marginTop: 20
  },
  imageContainer2: {
    flexDirection: "row",
    marginLeft: -25
  },
  imageContainer3: {
    flexDirection: "row",
    marginLeft: -50,
    marginBottom: 20
  },
  circleImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    margin: 5,
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "normal",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 20,
  },
  radioContainer: {
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 20,
  },
  radioTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioLabel: {
    marginLeft: 8,
  },
  radioLabelPrice: {
    fontSize: 12
  },
  button: {
    backgroundColor: "#F7D9A1",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: '#000'
  },
});
