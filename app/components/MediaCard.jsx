import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const POSTER_WIDTH = SCREEN_WIDTH * 0.38;
const POSTER_HEIGHT = POSTER_WIDTH * (3 / 2);
const WIDE_WIDTH = SCREEN_WIDTH * 0.65;
const WIDE_HEIGHT = WIDE_WIDTH * (9 / 16);

const getRatingColor = (rating) => {
  const r = parseFloat(rating);
  if (r < 30) return '#fe4500';
  if (r < 50) return '#1e91ff';
  if (r < 80) return '#ffd700';
  return '#00aa00';
};

const MediaCard = ({ title, year, poster, rating, wide }) => {
  const cardWidth = wide ? WIDE_WIDTH : POSTER_WIDTH;
  const cardHeight = wide ? WIDE_HEIGHT : POSTER_HEIGHT;

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <View style={[styles.imageWrap, { width: cardWidth, height: cardHeight, borderRadius: wide ? 16 : 14 }]}>
        {poster ? (
          <Image source={{ uri: poster }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        {rating != null && (
          <View style={[styles.ratingBadge, { borderColor: getRatingColor(rating) }]}>
            <Text style={styles.ratingText}>{`${rating}%`}</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      {year ? <Text style={styles.subtitle} numberOfLines={1}>{year}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageWrap: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHighest,
  },
  ratingBadge: {
    position: 'absolute',
    left: -10,
    top: -10,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
    lineHeight: 18,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
});

export default MediaCard;
