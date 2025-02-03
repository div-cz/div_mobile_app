import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const { width } = Dimensions.get('window')

const ItemCard = ({ title, year }) =>  {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2//huVnXS9Qg8G6rB68N5YXGIo6Mtz.jpg" }}
                style={styles.image} 
                
            />
          <Text style={styles.title}>
            {title}
         </Text>
         <Text style={styles.subtitle}>{year}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    image: {
        width: width * 0.2,
        height: width * 0.5 * (9 / 16),
        borderRadius: 8,
        bottom: 5
    },
    subtitle: {
        fontSize: RFValue(12), // Hodnota, která se přizpůsobí podle DPI
        color: 'gray',
    },
    title: {
        fontSize: RFPercentage(2), // 3 % výšky obrazovky
        fontWeight: 'bold',
        textAlign: 'left', 
    }
})

export default ItemCard