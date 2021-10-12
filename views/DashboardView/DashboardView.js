import React, { useState, useEffect } from 'react';

import { StyleSheet, FlatList, View, SafeAreaView, ScrollView, Text, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { SearchBar } from 'react-native-elements';

import { TMDB_URL, TMDB_POPULAR_MOVIES, TMDB_POPULAR_TVS, TMDB_GENRE_DOCUMENTARY, TMDB_GENRE_FAMILY, TMDB_API_KEY_SUFFIX, TMDB_API_KEY } from '../../config';
import { GlobalStyles, normalize } from '../../styles/GlobalStyles';
import CarouselComponent from './components/CarouselComponent';
import CategoryComponent from './components/CategoryComponent';

import { getImageUri, getItemTitle, getItemDescription } from '../../config';

const { width, height } = Dimensions.get('screen');

export default function DashboardView({ navigation }) {
   const [isLoadingPopularMovies, setLoadingPopularMovies] = useState(true);
   const [isLoadingPopularTvs, setLoadingPopularTvs] = useState(true);
   const [isLoadingDocumentaryGenre, setLoadingDocumentaryGenre] = useState(true);
   const [isLoadingFamilyGenre, setLoadingFamilyGenre] = useState(true);

   const [popularMoviesList, setPopularMoviesList] = useState([]);
   const [popularTvsList, setPopularTvsList] = useState([]);
   const [documentaryList, setDocumentaryList] = useState([]);
   const [familyList, setFamilyList] = useState([]);

   const [searchText, setsSearchText] = useState();
   const [search, setSearch] = useState([]);
   const [searchList, setShowSearchList] = useState(false);

   const receiveData = async () => {
      const URL_MOVIES = TMDB_URL + TMDB_POPULAR_MOVIES + TMDB_API_KEY_SUFFIX + TMDB_API_KEY;
      const URL_TVS = TMDB_URL + TMDB_POPULAR_TVS + TMDB_API_KEY_SUFFIX + TMDB_API_KEY;
      const URL_DOCUMENTARY = TMDB_URL + TMDB_GENRE_DOCUMENTARY;
      const URL_FAMILY = TMDB_URL + TMDB_GENRE_FAMILY;

      //GET popular movies
      fetch(URL_MOVIES, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
      .then((response) => response.json())
      .then((json) => {
         setPopularMoviesList([...json.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
         setLoadingPopularMovies(false)
      });

      //GET popular tv series
      fetch(URL_TVS, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
      .then((response) => response.json())
      .then((json) => {
         setPopularTvsList([...json.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
         setLoadingPopularTvs(false)
      });

      //GET documentary genre
      fetch(URL_DOCUMENTARY, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
      .then((response) => response.json())
      .then((json) => {
         setDocumentaryList([...json.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
         setLoadingDocumentaryGenre(false)
      });

      //GET family genre
      fetch(URL_FAMILY, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      })
      .then((response) => response.json())
      .then((json) => {
         setFamilyList([...json.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
         setLoadingFamilyGenre(false)
      });
   };

   const searchData = (containsText) => {
      setSearch(
         [
            ...new Set([...popularMoviesList, ...popularTvsList, ...documentaryList, ...familyList]
            .map(m => getItemTitle(m, true)))
         ]
         .filter(f => f.includes(containsText))
      );
   };

   const searchResultOnPressHandler = (item, navigation) => {
      setShowSearchList(false)
      let clickedItem = [
         ...popularMoviesList, ...popularTvsList, ...documentaryList, ...familyList
      ].find(itr => getItemTitle(itr, true) === item);

      console.log('searchResultOnPressHandler');
      console.log(item);
      console.log(clickedItem);

      navigation.navigate('Detail', {
         data: clickedItem,
      });
   };

   useEffect(() => {
      receiveData();
   }, []);

   return(
      <SafeAreaView style={styles.container}>
         {
            (isLoadingPopularMovies || isLoadingPopularTvs || isLoadingDocumentaryGenre || isLoadingFamilyGenre) 
            ?  <BarIndicator 
                  color={GlobalStyles.textColor} 
                  backgroundColor={GlobalStyles.backgroundColor}
                  count={5}
               /> 
            : (
               <View style={{flex: 1, width}}>
                  <SearchBar
                     inputStyle={{backgroundColor: GlobalStyles.backgroundColor}}
                     inputContainerStyle={{backgroundColor: GlobalStyles.backgroundColor}}
                     containerStyle={{backgroundColor: GlobalStyles.backgroundColor, borderWidth: 10}}
                     placeholder="Discover"
                     value={searchText}
                     onChangeText={(value) => {
                        setsSearchText(value);
                        searchData(value);
                     }}
                     onFocus={()=> setShowSearchList(true)} 
                     onCancel={()=> setShowSearchList(false)}
                  />
                  {
                     searchList
                     ?  
                        <FlatList
                           style={{flex: 1, backgroundColor: GlobalStyles.backgroundColor}}
                           data={search}
                           keyExtractor={(_, index) => index.toString()}
                           renderItem={({item}) => {
                              return (
                                 <TouchableOpacity style={styles.touchableOpacity} onPress={() => searchResultOnPressHandler(item, navigation)}>
                                    <Text style={styles.searchResultText}>{item}</Text>
                                 </TouchableOpacity>
                              );
                           }}
                        />
                     : (
                        <ScrollView style={styles.scrollView}>
                           <CarouselComponent
                              navigation={navigation}
                              data={popularMoviesList.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1)} postersCount={1}
                           />
                           <CategoryComponent 
                              navigation={navigation}
                              data={documentaryList} 
                              category={'Documentary'}
                           />
                           <CategoryComponent 
                              navigation={navigation}
                              data={familyList} 
                              category={'Family'}
                           />
                        </ScrollView>
                     )
                  }
               </View>
            )
         }
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
   //   paddingTop: 20,
     alignItems: 'center',
     justifyContent: 'center',
   },   
   scrollView: {
      flex: 1,
      backgroundColor: GlobalStyles.backgroundColor
   },
   touchableOpacity: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#272727',
      margin: 5,
   },
   searchResultText: {
      color: GlobalStyles.textColor,
      fontSize: normalize(18),
      flex: 1,
      padding: 5
   }
 });