import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { getItemTitle, getItemDescription } from '../../../config';

export default function OverviewComponent({ data }) {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>
            { getItemTitle(data, true) }
         </Text>
         <Text style={styles.subtitle}>
            { data.original_title.toUpperCase() }
         </Text>
         <Text style={styles.description}>
            { getItemDescription(data, 1, '', true) }
         </Text>
      </View>
    );
};

const styles = StyleSheet.create({
   container: { 
      flex: 1,
      backgroundColor: GlobalStyles.backgroundColor
   },
   title: {
      fontSize: 18,
      color: GlobalStyles.textColor,
      fontWeight: 'bold'
   },
   subtitle: {
      fontSize: 12,
      color: GlobalStyles.textColor,
   },
   description: {
      fontSize: 16,
      color: GlobalStyles.textColor,
   }
 });