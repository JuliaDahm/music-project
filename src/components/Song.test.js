import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';
import Song from './Song';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  url: "https://google.com"
});

describe('Song component', () => {
  it('shallow renders without crashing', () => {
    const props = getDefaultProps();

    shallow(<Song {...props} />);
  });
});