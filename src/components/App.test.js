import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';
import App from './App';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('App component', () => {
  it('shallow renders without crashing', () => {

    shallow(<App />);
  });
});