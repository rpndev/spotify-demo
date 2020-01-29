import React from 'react';
import TrackDetail from './index';

import renderer from 'react-test-renderer';

import SpotifyAPI from '../../lib/SpotifyAPI';

function TrackData({ name, artists, duration_ms, tracks, image_url }) {
  return {
    name,
    artists,
    duration_ms,
    album: {
      total_tracks: tracks,
      images: [
        { url: image_url }
      ]
    }
  };
}

const stubbedAPIResponse = {
  name: 'Daytrip',
  artists: [
    { name: 'STEPHAN' },
    { name: 'Current Blue' }
  ],
  duration_ms: 180254,
  album: {
    total_tracks: 2,
    images: [
      { url: 'https://i.scdn.co/image/ac89987a987b98c978f978' }
    ]
  }
};

beforeEach(() => {
  SpotifyAPI.get = jest.fn(() => Promise.resolve({ data: { data: stubbedAPIResponse }}));
});

describe('TrackDetail', () => {
    it('renders correctly after fetching API', () => {
      const props = { 
        navigation: {
          navigate: jest.fn(),
          state: {
            params: {
              track_id: '23432432',
              title: 'asdfadsf'
            }
          },
          setParams: jest.fn()
          
        }
      };
      const tree = renderer.create(<TrackDetail {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});