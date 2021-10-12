import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';

export default function PlayComponent({navigation}) {
   const onPressHandler = (navigation) => {
      console.log('som tu');
      navigation.navigate('Video', { });
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity 
            onPress={() => onPressHandler(navigation)}
            style={styles.touchableOpacity}
         >
            <Text style={styles.text}>
               PLAY
            </Text>
         </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
   container: { },
   touchableOpacity: {
      backgroundColor: 'blue',
      position: 'absolute',
      marginTop: -80,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      right: 20
   },
   text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: GlobalStyles.textColor
   }
 });