import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = CARD_WIDTH * (9 / 16);

const HeroCard = ({ image, badge, badgeColor, badgeTextColor, title, description }) => (
  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
    {image ? (
      <Image source={{ uri: image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
    ) : (
      <View style={[StyleSheet.absoluteFill, styles.imagePlaceholder]} />
    )}
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.5)', '#080808']}
      locations={[0, 0.55, 1]}
      style={StyleSheet.absoluteFill}
    />
    <View style={styles.content}>
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={[styles.badgeText, { color: badgeTextColor }]}>{badge}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      {description ? (
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
});

export default HeroCard;
