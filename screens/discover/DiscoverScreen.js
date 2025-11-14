import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useDevModeStore } from '../../store/devModeStore';
import { theme } from '../../config/theme';
import FindPartiesScreen from './FindPartiesScreen';
import FindPeopleScreen from './FindPeopleScreen';

const Tab = createMaterialTopTabNavigator();

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const { handleLogoPress, isDevMode, tapCount } = useDevModeStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
          <Text style={styles.logo}>🎉</Text>
          {tapCount > 0 && tapCount < 10 && (
            <Text style={styles.tapCounter}>{tapCount}/10</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PartyConnect</Text>
        {isDevMode && (
          <TouchableOpacity
            onPress={() => navigation.navigate('DevMode')}
            style={styles.devBadge}
          >
            <Text style={styles.devBadgeText}>DEV</Text>
          </TouchableOpacity>
        )}
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen 
          name="FindParties" 
          component={FindPartiesScreen}
          options={{ title: 'Find Parties' }}
        />
        <Tab.Screen 
          name="FindPeople" 
          component={FindPeopleScreen}
          options={{ title: 'Find People' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.glow,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    fontSize: 32,
  },
  tapCounter: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  devBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.glow,
  },
  devBadgeText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});

