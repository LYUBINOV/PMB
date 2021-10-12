import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';

export default function VideoView() {
   const [player, setPlayer] = useState();

   return (
      <View style={styles.videoContainer}>
         <Video  
            ref={(ref) => {
               setPlayer(ref)
            }} 
            source={require('../../assets/big_buck_bunny.mp4')}                  // the video file
            style={styles.backgroundVideo} 
            muted={false}                           
            resizeMode="cover"                      
            repeat={false}                          
            playInBackground={false}                
            playWhenInactive={false}                
            ignoreSilentSwitch={"ignore"}           
            progressUpdateInterval={250.0}          
            onLoadStart={this.loadStart}            
            onLoad={this.setDuration}               
            onProgress={this.setTime}               
            onEnd={this.onEnd}                      
            onError={this.videoError}               
            onBuffer={this.onBuffer}                
            onTimedMetadata={this.onTimedMetadata}  
            controls={true}
            fullscreen={true}
         />
      </View>
   )
};

var styles = StyleSheet.create({
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
   videoContainer: {
      flex: 1,
      backgroundColor: 'black',
   },
 });