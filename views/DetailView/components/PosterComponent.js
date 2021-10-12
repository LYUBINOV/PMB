import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { getImageUri } from '../../../config';

const { width, height } = Dimensions.get('screen');

export default function PosterComponent({data}) {
   return (
      <View style={styles.container}>
         <Image 
            source={{uri: getImageUri(data, 1)}}
            style={styles.carouselFlatListItemImage}  
         />
      </View>
    );
};

const styles = StyleSheet.create({
   container: { 
      alignItems: 'center',
      backgroundColor: GlobalStyles.backgroundColor
   },
   carouselFlatListItemImage: {
      resizeMode: 'cover',
      width, 
      height: height / 3
   },
 });