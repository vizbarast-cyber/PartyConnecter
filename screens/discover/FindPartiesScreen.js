import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../config/theme';

const { width, height } = Dimensions.get('window');

export default function FindPartiesScreen() {
  const navigation = useNavigation();
  const { userProfile } = useAuthStore();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    loadParties();
  }, []);

  const loadParties = async () => {
    try {
      const response = await api.get('/party/list');
      setParties(response.data.parties);
    } catch (error) {
      console.error('Error loading parties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeRight = async (index) => {
    // Like/save party - creates a request
    const party = parties[index];
    if (party) {
      try {
        const response = await api.post(`/party/${party._id}/like`);
        console.log('Request sent:', party.title);
        // Show success message if request was created
        if (response.data.requestStatus === 'pending') {
          // You could show a toast notification here
        }
      } catch (error) {
        console.error('Error liking party:', error);
      }
    }
  };

  const handleSwipeLeft = (index) => {
    // Skip party - no action needed
    console.log('Skipped party:', parties[index]?.title);
  };

  const handleTap = (index) => {
    navigation.navigate('PartyDetail', { partyId: parties[index]._id });
  };

  const handleLikePress = async () => {
    if (swiperRef.current && currentIndex < parties.length) {
      const party = parties[currentIndex];
      if (party) {
        try {
          const response = await api.post(`/party/${party._id}/like`);
          if (response.data.requestStatus === 'pending') {
            Alert.alert(
              'Request Sent!',
              'Your request has been sent to the organizer. You will be notified when they respond.',
              [{ text: 'OK' }]
            );
          }
          swiperRef.current.swipeRight();
        } catch (error) {
          console.error('Error liking party:', error);
          const errorMessage = error.response?.data?.error || 'Failed to send request. Please try again.';
          Alert.alert('Error', errorMessage);
        }
      }
    }
  };

  const handlePassPress = () => {
    if (swiperRef.current && currentIndex < parties.length) {
      swiperRef.current.swipeLeft();
    }
  };

  const onSwiped = (index) => {
    setCurrentIndex(index + 1);
  };

  const renderCard = (party, index) => {
    if (!party) return null;

    const partyDate = new Date(party.date);
    const formattedDate = partyDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleTap(index)}
        activeOpacity={0.9}
      >
        {party.images && party.images.length > 0 && (
          <Image
            source={{ uri: party.images[0].url }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardOverlay}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{party.title}</Text>
            <Text style={styles.cardDate}>
              {formattedDate} at {party.time}
            </Text>
            <Text style={styles.cardPrice}>${party.pricePerPerson} per person</Text>
            {party.description && (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {party.description}
              </Text>
            )}
            {party.location?.city && (
              <Text style={styles.cardLocation}>📍 {party.location.city}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (parties.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No parties available</Text>
        <Text style={styles.emptySubtext}>Check back later!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={parties}
        renderCard={renderCard}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        onSwiped={onSwiped}
        cardIndex={currentIndex}
        backgroundColor="transparent"
        stackSize={3}
        stackSeparation={15}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 24,
                borderWidth: 2,
                borderColor: 'white',
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: '#4CAF50',
                color: 'white',
                fontSize: 24,
                borderWidth: 2,
                borderColor: 'white',
              },
            },
          },
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeAnimationDuration={300}
        disableTopSwipe
        disableBottomSwipe
      />
      
      {/* Action Buttons */}
      {parties.length > 0 && currentIndex < parties.length && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.passButton]}
            onPress={handlePassPress}
            activeOpacity={0.7}
          >
            <Text style={styles.passButtonText}>✕</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.likeButton]}
            onPress={handleLikePress}
            activeOpacity={0.7}
          >
            <Text style={styles.likeButtonText}>♥</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {parties.length > 0 && currentIndex >= parties.length && (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No more parties!</Text>
          <Text style={styles.emptySubtext}>Check back later for new parties</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  card: {
    height: height * 0.7,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.glowStrong,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,15,0.5)',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 20,
    backgroundColor: 'rgba(10,10,15,0.8)',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardDate: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.accent,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  cardLocation: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 40,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.glowStrong,
  },
  passButton: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#FF4444',
  },
  likeButton: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  passButtonText: {
    fontSize: 36,
    color: '#FF4444',
    fontWeight: 'bold',
  },
  likeButtonText: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

