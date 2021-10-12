import React from 'react';
import { FlatList, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageUri, getItemTitle, getItemDescription } from '../../../config';
import { GlobalStyles, normalize } from '../../../styles/GlobalStyles';

const { width, height } = Dimensions.get('screen');

let imageW = width * 0.95;
let imageH = height * 0.3;

export default function CarouselComponent({navigation, data, postersCount, category}) {
   const clickCarouselOnPressHandler = (item, navigation) => {
      console.log('clickCarouselOnPressHandler');
      navigation.navigate('Detail', {
         data: item,
      });
   }

   return (
      <View style={styles.container}>
         <FlatList 
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled={postersCount === 1 ? true : false}
            style={styles.carouselFlatList}
            renderItem={({item}) => {
               return (
                  <TouchableOpacity style={styles.loginTouchableOpacity} onPress={() => clickCarouselOnPressHandler(item, navigation)}>
                     <View style={[ styles.carouselFlatListItem, { width: width / postersCount } ]}>
                        <Image 
                           source={{uri: getImageUri(item, postersCount)}}
                           style={[ styles.carouselFlatListItemImage, { width: imageW / postersCount, height: imageH } ]}   
                        />
                        <View style={[ styles.carouselFlatListItemInfo, {width: imageW / postersCount } ]}>
                        {
                           postersCount === 1
                           ? (
                              <View>
                                 <Text style={styles.carouselFlatListItemInfoDescription}>{getItemDescription(item, postersCount, category)}</Text>
                                 <Text style={styles.carouselFlatListItemInfoTitle}>{getItemTitle(item)}</Text>
                              </View>
                           ) : (
                              <View>
                                 <Text style={styles.carouselFlatListItemInfoTitle}>{getItemTitle(item)}</Text>
                                 <Text style={styles.carouselFlatListItemInfoDescription}>{getItemDescription(item, postersCount, category)}</Text>
                              </View>
                           )
                        }
                        </View>
                     </View>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
    );
};

const styles = StyleSheet.create({
   container: { flex: 1 },
   carouselFlatList: {
      // paddingTop: 20, 
      backgroundColor: 'black'
   },
   carouselFlatListItem: {
      justifyContent: 'center', 
      alignItems: 'center'
   },
   carouselFlatListItemImage: {
      resizeMode: 'cover',
      borderRadius: 16,
   },
   carouselFlatListItemInfo: {
      bottom: 0,
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      position: 'absolute', 
      paddingLeft: 10,
      paddingBottom: 10,
      // paddingRight: 30
   },
   carouselFlatListItemInfoTitle: {
      color: GlobalStyles.textColor,
      fontSize: normalize(20),
      fontWeight: 'bold'
   },
   carouselFlatListItemInfoDescription: {
      color: GlobalStyles.textColor,
      fontSize: normalize(14),
   },
 });