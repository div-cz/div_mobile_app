import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const POSTER_WIDTH = SCREEN_WIDTH * 0.38;
const POSTER_HEIGHT = POSTER_WIDTH * (3 / 2);
const WIDE_WIDTH = SCREEN_WIDTH * 0.65;
const WIDE_HEIGHT = WIDE_WIDTH * (9 / 16);
const BADGE_SIZE = 44;
const BADGE_OFFSET = 10;

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
  const radius = wide ? 16 : 14;

  return (
    <View style={[styles.container, { width: cardWidth + BADGE_OFFSET }]}>
      <View style={[styles.imageWrap, { marginTop: BADGE_OFFSET, marginLeft: BADGE_OFFSET }]}>
        {/* Vnitřní view s overflow hidden pouze pro borderRadius obrázku */}
        <View style={[styles.imageClip, { width: cardWidth, height: cardHeight, borderRadius: radius }]}>
          {poster ? (
            <Image source={{ uri: poster }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>

        {/* Badge přesahuje přes roh karty */}
        {rating != null && (
          <View style={[styles.ratingBadge, { borderColor: getRatingColor(rating) }]}>
            <Text style={styles.ratingText}>{`${rating}%`}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { marginLeft: BADGE_OFFSET }]} numberOfLines={2}>{title}</Text>
      {year ? <Text style={[styles.subtitle, { marginLeft: BADGE_OFFSET }]} numberOfLines={1}>{year}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageWrap: {
    marginBottom: 8,
  },
  imageClip: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
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
    left: -BADGE_OFFSET,
    top: -BADGE_OFFSET,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 10,
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
