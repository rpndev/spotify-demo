/**
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import SpotifyAPI from '../../lib/SpotifyAPI';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Tracks = props => {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    SpotifyAPI.get(
      `/playlists/${props.navigation.state.params.playlist_id}/tracks`,
    )
      .then(res => {
        setTracks(
          res.data.items.filter(item => item.track).map(item => item.track),
        );
      })
      .catch(e => console.log('error', e.response));
  }, [props]);

  return (
    <FlatList
      data={tracks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('trackDetail', {track_id: item.id})
          }>
          <View style={styles.listItem}>
            {item.video_thumbnail && (
              <Image
                source={{
                  uri: item.video_thumbnail.url,
                  height: 60,
                  width: 100,
                }}
                resizeMode="cover"
                style={styles.listItemImage}
              />
            )}
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text>
                Artists: {item.artists.map(artist => artist.name).join(', ')}
              </Text>
              <Text>Popularity: {item.popularity}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
  },
  content: {
    padding: 30,
  },
  seperator: {
    height: 20,
  },
  listItem: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    padding: 20,
  },
  listItemImage: {
    borderRadius: 10,
    marginRight: 20,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Tracks;
