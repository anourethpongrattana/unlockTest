import React, { useCallback, useRef, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { getArtistes, type Artiste } from "@/api/artistes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useThemeColor } from "@/hooks/useThemeColor";

import { ThemedViewProps } from "./ThemedView";

export function BottomSheetTab({ lightColor, darkColor }: ThemedViewProps) {
  const bgBottomSheet = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bgBottomSheet"
  );

  const bgItem = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bgItem"
  );

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

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }: { item: Artiste }) => (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: bgItem }]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
          {item.premium && (
            <View style={styles.premiumIcon}>
              <Ionicons
                name="star"
                size={8}
                color="white"
                style={{ borderBlockColor: "#BD9E6E" }}
              />
            </View>
          )}
        </View>
        <ThemedText style={styles.itemText}>{item.name}</ThemedText>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backgroundStyle={{ backgroundColor: bgBottomSheet }}
    >
      <View style={{ flexDirection: "row",paddingHorizontal: 20, paddingVertical: 5, gap: 16 }}>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
        <ThemedText style={{ fontSize: 12}}>Filter category</ThemedText>
      </View>
      <BottomSheetFlatList
        data={query.data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    maxWidth: 112,
    maxHeight: 112,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  premiumIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F7D9A1",
    width: 14,
    height: 14,
    borderRadius: 7,
    padding: 3,
  },
  itemText: {
    fontSize: 11,
    lineHeight: 11,
    textAlign: "center",
  },
});
