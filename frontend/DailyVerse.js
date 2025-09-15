import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'https://yeheu5s90h.execute-api.ca-central-1.amazonaws.com/default/getDailyVerse';
const { width } = Dimensions.get('window');

/**
 * parseVerse
 * - Splits the incoming verse string into { text, reference }
 * - Uses a separator that requires spaces around the dash (so " — " or " - " splits),
 *   which avoids splitting hyphenated references like "6:24-25".
 * - If no explicit dash separator is found, attempts a fallback pattern match
 *   to capture trailing references like "John 14:27" or "Numbers 6:24-25".
 */
const parseVerse = (verseText) => {
  if (!verseText) return { text: '', reference: '' };

  // Normalize whitespace and trim
  const str = String(verseText).trim();

  // 1) Primary: look for a separator that is "space + dash (any type) + space"
  // This will NOT match hyphens inside references (like "24-25") because those don't have spaces.
  const sepRegex = /\s[—–-]\s(.+)$/u; // capture everything after the last " space-dash-space "
  const sepMatch = str.match(sepRegex);

  if (sepMatch) {
    const reference = sepMatch[1].trim();
    const text = str.slice(0, sepMatch.index).trim();
    return { text, reference };
  }

  // 2) Fallback: try to capture a trailing Bible reference pattern like "Numbers 6:24-25" or "John 14:27"
  // This looks for "Words + space + digits:digits" at the end of the string (with optional -digits)
  const refPattern = /([A-Za-z\.\s]+?\b\d{1,3}:\d{1,3}(?:-\d{1,3})?)$/u;
  const refMatch = str.match(refPattern);
  if (refMatch) {
    const reference = refMatch[1].trim();
    const text = str.slice(0, refMatch.index).trim().replace(/[—–-]\s*$/u, '').trim();
    return { text, reference };
  }

  // 3) Last-resort: no reference found — return whole string as text.
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
      } catch (parseErr) {
        // If response isn't JSON, read as text
        const text = await response.text();
        data = text;
      }

      // If API Gateway proxy returned an envelope with body string, try to extract
      if (data && typeof data === 'object' && data.body) {
        try {
          const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
          data = parsedBody;
        } catch {
          // body wasn't JSON, keep as-is (string)
          data = data.body;
        }
      }

      // Determine the verse string from known shapes
      let verseText = '';
      if (!data) {
        verseText = '';
      } else if (typeof data === 'string') {
        // whole response is the verse string
        verseText = data;
      } else if (data.text) {
        verseText = data.text;
      } else if (data.verse) {
        verseText = data.verse;
      } else if (data.message && typeof data.message === 'string') {
        // sometimes APIs return { message: "..." }
        verseText = data.message;
      } else {
        // as a final fallback stringify
        verseText = JSON.stringify(data);
      }

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
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.glassCard}>
      <View style={styles.verseContainer}>
        <Text style={styles.verseTitle}>Verse of the Day</Text>
        {verseData.reference ? (
          <Text style={styles.verseReference}>{verseData.reference}</Text>
        ) : null}
        <Text style={styles.verseText}>{verseData.text}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 180,
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
    paddingVertical: 8,
  },
  verseTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 6,
  },
  verseReference: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'left',
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default DailyVerse;
