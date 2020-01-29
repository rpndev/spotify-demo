import React from 'react';
import PlayList from './index';

import renderer from 'react-test-renderer';

import SpotifyAPI from '../../lib/SpotifyAPI';

function PlayListData({ id, image, name, traks }) {
  return {
    id,
    images: { url: image },
    name,
    traks: { total: traks }
  };
}

const stubbedAPIResponse = {
  playlists: {
    items: [
      PlayListData({
        id: 'dsflkhasfd3',
        image: 'https://i.scdn.co/image/ab67706f00000002487cfbde23e0179f7bcf37d5',
        name: 'Fresh Finds Presents... Class of 2019',
        traks: 100
      }),
      PlayListData({
        id: 'dsfgfd67sdfg76',
        image: 'https://i.scdn.co/image/ab67706f00000002487cfbde23e0179f7bcf37d5',
        name: 'Fresh Finds: Fire Emoji',
        traks: 120
      })
    ]
  }
};


beforeEach(() => {
    SpotifyAPI.get = jest.fn(() => Promise.resolve({ data: { data: stubbedAPIResponse }}));
});

describe('PlayList', () => {
  it('renders correctly after fetching API', () => {
    const props = { 
      navigation: {
        navigate: jest.fn()
      }
    };

    const tree = renderer.create(<PlayList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});