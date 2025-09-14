import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'https://yeheu5s90h.execute-api.ca-central-1.amazonaws.com/default/getDailyVerse';
const { width } = Dimensions.get('window');

const DailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyVerse();
  }, []);

  const fetchDailyVerse = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different possible response structures
      if (data.verse || data.text || data.body) {
        setVerse(data.verse || data.text || data.body);
      } else if (typeof data === 'string') {
        setVerse(data);
      } else {
        // If the response has a different structure, display the whole response
        setVerse(JSON.stringify(data, null, 2));
      }
      
    } catch (err) {
      console.error('Error fetching daily verse:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchDailyVerse();
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
        style={styles.glassCard}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
        style={styles.glassCard}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load verse</Text>
          <Text style={styles.errorSubtext}>Something went wrong</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
      style={styles.glassCard}
    >
      <View style={styles.verseContainer}>
        <Text style={styles.verseLabel}>Today's Verse</Text>
        <Text style={styles.verseText}>{verse}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 32,
    padding: 32,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    minHeight: 200,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  errorSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '300',
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    minWidth: 140,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  verseContainer: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  verseLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
    textAlign: 'center',
  },
  verseText: {
    fontSize: 22,
    lineHeight: 36,
    color: '#ffffff',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '400',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default DailyVerse;
