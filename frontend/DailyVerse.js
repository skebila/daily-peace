import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // icons

const API_URL = 'https://yeheu5s90h.execute-api.ca-central-1.amazonaws.com/default/getDailyVerse';

/**
 * parseVerse
 */
const parseVerse = (verseText) => {
  if (!verseText) return { text: '', reference: '' };

  const str = String(verseText).trim();

  const sepRegex = /\s[—–-]\s(.+)$/u;
  const sepMatch = str.match(sepRegex);

  if (sepMatch) {
    const reference = sepMatch[1].trim();
    const text = str.slice(0, sepMatch.index).trim();
    return { text, reference };
  }

  const refPattern = /([A-Za-z\.\s]+?\b\d{1,3}:\d{1,3}(?:-\d{1,3})?)$/u;
  const refMatch = str.match(refPattern);
  if (refMatch) {
    const reference = refMatch[1].trim();
    const text = str.slice(0, refMatch.index).trim().replace(/[—–-]\s*$/u, '').trim();
    return { text, reference };
  }

  return { text: str, reference: '' };
};

const DailyVerse = () => {
  const [verseData, setVerseData] = useState({ text: '', reference: '' });
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
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = await response.text();
      }

      if (data && typeof data === 'object' && data.body) {
        try {
          const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
          data = parsedBody;
        } catch {
          data = data.body;
        }
      }

      let verseText = '';
      if (!data) verseText = '';
      else if (typeof data === 'string') verseText = data;
      else if (data.text) verseText = data.text;
      else if (data.verse) verseText = data.verse;
      else if (data.message && typeof data.message === 'string') verseText = data.message;
      else verseText = JSON.stringify(data);

      const parsed = parseVerse(verseText);
      setVerseData(parsed);
    } catch (err) {
      console.error('Error fetching daily verse:', err);
      setError(err.message || 'Unknown error');
      setVerseData({ text: '', reference: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchDailyVerse();
  };

  if (loading) {
    return (
      <LinearGradient colors={['#3a7bd5', '#3a6073']} style={styles.glassCard}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#ee9ca7', '#ffdde1']} style={styles.glassCard}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load verse</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#78B9B5', '#065084']} style={styles.glassCard}>
      <View style={styles.verseContainer}>
        <Text style={styles.verseTitle}>Today's verse</Text>
        {verseData.reference ? (
          <Text style={styles.verseReference}>{verseData.reference}</Text>
        ) : null}

        <View style={styles.verseTextContainer}>
          <Text style={styles.verseText}>{verseData.text}</Text>
        </View>

        {/* Bottom icons row */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="heart-outline" size={15} color="#fff" />
            <Text style={styles.iconText}>1.2M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="chatbubble-outline" size={15} color="#fff" />
            <Text style={styles.iconText}>6,826</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="share-outline" size={15} color="#fff" />
            <Text style={styles.iconText}>447.7K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="bookmark-outline" size={15} color="#fff" />
            <Text style={styles.iconText}>12.3K</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    padding: 15,
    //marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 180,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#1a1a1a',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
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
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '400',
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  retryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  verseContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  verseTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    position: 'absolute',
    top: 12,
    left: 0,
  },
  verseReference: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    position: 'absolute',
    top: 30,
    left: 0,
  },
  verseTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  verseText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: 26,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 8,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
});

export default DailyVerse;
