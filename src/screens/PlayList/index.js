/**
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getCountry} from 'react-native-localize';
import SpotifyAPI from '../../lib/SpotifyAPI';

const PlayList = props => {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    SpotifyAPI.get('/browse/featured-playlists', {
      params: {country: getCountry()},
    })
      .then(res => setPlaylist(res.data.playlists.items))
      .catch(e => console.log(e.response));
  }, []);

  return (
    <FlatList
      data={playlist}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('tracks', {playlist_id: item.id})
          }>
          <View style={styles.listItem}>
            <Image
              source={{uri: item.images[0].url, height: 60, width: 100}}
              resizeMode="cover"
              style={styles.listItemImage}
            />
            <View style={styles.listItemContent}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text>Number of tracks: {item.tracks.total}</Text>
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
  },
  listItemContent: {
    flex: 1,
  },
  listItemImage: {
    borderRadius: 10,
    marginRight: 20,
  },
  nameText: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PlayList;
