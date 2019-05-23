import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';
import Albums from './Albums';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  handleSong: jest.fn(),
  isLoading: false,
  albums: [{albumName: 'foo', albumId: 'bar'}]
});

describe('Albums component', () => {
  it('shallow renders without crashing', () => {
    const props = getDefaultProps();

    shallow(<Albums {...props} />);
  });
});