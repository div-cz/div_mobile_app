import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const { width } = Dimensions.get('window')

const getOverlayColor = (rating) => {
    const ratingNumber = parseFloat(rating)
    
    if (ratingNumber < 30) {
        return '#fe4500'  // červená 
    } else if (ratingNumber < 50) {
        return '#1e91ff'  // modrá 
    } else if (ratingNumber < 80) {
        return '#ffd700'  // žlutá
    } else {
        return '#00aa00'  // zelená 
    }
}

const MediaCard = ({ title, year, poster, rating }) =>  {
    return (
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                // source={require("../assets/v-hlave.jpeg")}
                source={{ uri: poster }}
                style={styles.image} 
                
            />
              <View style={[
                styles.overlay, 
                { borderColor: getOverlayColor(rating) } 
                ]}>
                    <Text style={styles.overlayText}>{`${rating}%`}</Text>
                </View>
          
        </View>
        <Text style={styles.title}>
            {title}
         </Text>
         <Text style={styles.subtitle}>2024</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: width * 0.3,
        height: width * 0.8 * (9 / 16),
        // backgroundColor: '#eeeeff'
    },
    imageContainer: {
        position: 'relative',
        width: width * 0.2, // stejná šířka jako obrázek
        justifyContent: 'flex-start',
        bottom: 5,
    },
    image: {
        width: width * 0.2,
        height: width * 0.52 * (9 / 16),
        borderRadius: 8,
    },
    overlay: {
        position: 'absolute',
        left: -12,
        top: -12,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Poloprůhledné černé pozadí
        paddingHorizontal: 5,
        paddingVertical: 5,
        width: 36,  // pevná šířka
        height: 36, // stejná jako šířka
        borderRadius: 18, // polovina šířky/výšky
        borderWidth: 1.5,
        // Centrování textu v kruhu
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        fontSize: RFValue(8),
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: RFValue(10), // Hodnota, která se přizpůsobí podle DPI
        color: 'gray',
    },
    title: {
        fontSize: RFPercentage(1.5), // 3 % výšky obrazovky
        // fontWeight: 'bold',
        textAlign: 'left', 
    }
})

export default MediaCard