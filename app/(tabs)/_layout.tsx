import { Tabs, router } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Micro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'mic' : 'mic-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="getPro"
        options={{
          title: 'Get pro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            router.push("screen/getProScreen") 
          },
        })}
      />
    </Tabs>
  );
}
