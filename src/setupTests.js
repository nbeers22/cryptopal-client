import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from './test/_mock/fetch';
 
global.fetch = jest.fn().mockImplementation(() => fetch);

configure({ adapter: new Adapter() });