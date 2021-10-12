import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PosterComponent from './components/PosterComponent';
import OverviewComponent from './components/OverviewComponent';
import PlayComponent from './components/PlayComponent';
import { GlobalStyles } from '../../styles/GlobalStyles';

export default function DetailView({route, navigation}) {
   const { data } = route.params;
   return (
      <View style={styles.container}>
         <PosterComponent data={data}/>
         <PlayComponent navigation={navigation}/>
         <OverviewComponent data={data}/>
      </View>
    );
};

const styles = StyleSheet.create({
   container: { 
      flex: 1,
      backgroundColor: GlobalStyles.backgroundColor,
      // justifyContent: 'center',
      // alignItems: 'center'
   },
 });