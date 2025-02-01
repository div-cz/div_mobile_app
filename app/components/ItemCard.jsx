import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const { width } = Dimensions.get('window')

const ItemCard = () =>  {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/v-hlave.jpeg')}
                style={styles.image} 
                
            />
          <Text style={styles.title}>
            V Hlavě 2
         </Text>
         <Text style={styles.subtitle}>(2024)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        textAlign: 'left', // Zarovnání textu doleva
    },
    title: {
        fontSize: RFPercentage(2), // 3 % výšky obrazovky
        fontWeight: 'bold',
        textAlign: 'left', 
    }
})

export default ItemCard