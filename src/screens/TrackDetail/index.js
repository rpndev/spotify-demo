/**
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import SpotifyAPI from '../../lib/SpotifyAPI';

const TrackDetail = props => {
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState({});
  useEffect(() => {
    SpotifyAPI.get(`/tracks/${props.navigation.state.params.track_id}`)
      .then(res => {
        setTrack(res.data);
        props.navigation.setParams({title: res.data.name});
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log('error', e.response);
      });
  }, [props]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.trackNameText}>{track.name}</Text>
          <Text style={styles.artistsText}>
            Artists: {track.artists.map(e => e.name).join(', ')}
          </Text>
          <Text>Duration: {track.duration_ms}</Text>
          <View style={styles.albumContainer}>
            <Text>Album</Text>
            <Text>Name: {track.album.name}</Text>
            <Text>Total Tracks: {track.album.total_tracks}</Text>
            <Image
              source={{uri: track.album.images[0].url}}
              resizeMode="cover"
              style={styles.albumImage}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 20,
  },
  trackNameText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 24,
  },
  artistsText: {
    fontWeight: '400',
    fontSize: 20,
  },
  albumContainer: {
    marginHorizontal: 40,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  albumImage: {
    height: 200,
    opacity: 0.7,
    padding: 12,
  },
});

TrackDetail.navigationOptions = ({navigation}) => ({
  title: navigation.state.params
    ? navigation.state.params.title
    : 'Track Detail',
});

export default TrackDetail;
