// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  const features = [
    {
      icon: 'create-outline',
      title: 'Easy Form Building',
      description: 'Create forms in minutes with our intuitive builder'
    },
    {
      icon: 'bar-chart-outline',
      title: 'Real-time Analytics',
      description: 'Get instant insights from responses'
    },
    {
      icon: 'lock-closed-outline',
      title: 'Secure & Private',
      description: 'Enterprise-grade security for your data'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Beautiful Forms</Text>
        <Text style={styles.subtitle}>
          Build, share, and analyze forms with our intuitive form builder
        </Text>
      </View>

      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Ionicons name={feature.icon} size={32} color="#2196F3" />
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          title="Get Started Free"
          icon={<Ionicons name="arrow-forward" size={20} color="white" />}
          iconRight
          onPress={() => navigation.navigate('Register')}
          containerStyle={styles.primaryButton}
        />
        <Button
          title="Sign In"
          type="outline"
          onPress={() => navigation.navigate('Login')}
          containerStyle={styles.secondaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1f2937'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24
  },
  features: {
    marginBottom: 40
  },
  featureCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280'
  },
  actions: {
    gap: 12
  },
  primaryButton: {
    marginBottom: 12
  },
  secondaryButton: {
    marginBottom: 12
  }
});