import React from 'react';
import Tracks from './index';

import renderer from 'react-test-renderer';

import SpotifyAPI from '../../lib/SpotifyAPI';

jest.mock('react-native-gesture-handler', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
}));

const 

function TrackData({ id, image, name, popularity, artists }) {
  return {
    track: {
      id: id,
      video_thumbnail: image,
      name: name,
      popularity: popularity,
      artists: artists
    }
  };
}

const stubbedAPIResponse = {
  playlists: {
    items: [
      TrackData({
        id: 'dsflkhasfd3',
        image: 'https://i.scdn.co/image/ab67706f00000002487cfbde23e0179f7bcf37d5',
        name: 'Molly Girl',
        popularity: 1,
        artists: [
          { name: 'Lil Teca' },
          { name: 'Henry Willy' }
        ]
      }),
      TrackData({
        id: 'dsflkasdffd3',
        image: 'https://i.scdn.co/image/ab67706f00000002487cfbde23e0179f7bcf37d5',
        name: 'HOMESICK',
        popularity: 0.4,
        artists: [
          { name: 'Madonna' },
          { name: 'Taylor Swift' }
        ]
      }),
      TrackData({
        id: 'dsflasdfafd3',
        image: 'https://i.scdn.co/image/ab67706f00000002487cfbde23e0179f7bcf37d5',
        name: 'My Love',
        popularity: 0.8,
        artists: [
          { name: 'Shakira' },
          { name: 'Jenifer' }
        ]
      }),
    ]
  }
};

beforeEach(() => {
    SpotifyAPI.get = jest.fn(() => Promise.resolve({ data: { data: stubbedAPIResponse }}));
});

describe('Tracks', () => {
    it('renders correctly after fetching API', () => {
      const props = { 
        navigation: {
          navigate: jest.fn()
        }
      };
      const tree = renderer.create(<Tracks {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});