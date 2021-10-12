import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import  CarouselComponent from './CarouselComponent';
import { GlobalStyles, normalize } from '../../../styles/GlobalStyles';

const { width, height } = Dimensions.get('screen');

let imageW = width * 0.95;

export default function CategoryComponent({navigation, data, category}) {
   return (
      <View style={styles.container}>
         <View style={styles.categoryDescription}>
            <Text style={styles.categoryDescriptionCategory}>
               {category}
            </Text>
            <Text style={styles.categoryDescriptionMore}>
               MORE
            </Text>
         </View> 
         <CarouselComponent navigation={navigation} data={data} postersCount={3} category={category}/>
      </View>
    );
};

const styles = StyleSheet.create({
   container: { 
      paddingTop: 20,
      alignItems: 'center',
      flex: 1
   },
   categoryDescription: {
      marginBottom: 20,
      flexDirection: 'row',
      width: imageW,
      backgroundColor: 'black'
   },
   categoryDescriptionCategory: {
      flex: 1, 
      alignItems: 'flex-start', 
      justifyContent: 'flex-start',
      color: GlobalStyles.textColor,
      fontWeight: 'bold',
      fontSize: normalize(16)
   },
   categoryDescriptionMore: {
      alignItems: 'flex-end', 
      justifyContent: 'flex-end',
      color: GlobalStyles.textColor,
      fontWeight: 'bold',
      fontSize: normalize(16)
   }
 });