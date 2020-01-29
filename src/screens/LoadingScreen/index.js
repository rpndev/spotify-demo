import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {getAccessToken} from '../../lib/SpotifyAPI';

const LoadingScreen = props => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccessToken()
      .then(() => {
        setLoading(false);
        props.navigation.navigate('app');
      })
      .catch(() => setLoading(false));
  }, [props]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default LoadingScreen;
