import axios from 'axios';
import {encode} from 'base-64';
import {
  SPOTIFY_API_PREFIX,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from 'react-native-dotenv';

const SpotifyAPI = axios.create({
  baseURL: SPOTIFY_API_PREFIX,
});

SpotifyAPI.interceptors.response.use(
  res => res,
  async e => {
    console.log(e);
    if (e.status.status === 401) {
      await getAccessToken();
    }
  },
);

export const getAccessToken = async () => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      data,
      {
        headers: {
          Authorization: `Basic ${encode(
            SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET,
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    SpotifyAPI.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
  } catch (e) {
    console.log('get access token failed: ', e);
  }
};

export default SpotifyAPI;
