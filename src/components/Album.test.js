import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';
import Album from './Album';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  handleSong: jest.fn(),
  isLoading: false,
  tracks: [{trackName: 'foo', previewUrl: 'bar'}]
});

describe('Album component', () => {
  it('shallow renders without crashing', () => {
    const props = getDefaultProps();

    shallow(<Album {...props} />);
  });
});
