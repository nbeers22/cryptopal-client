import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Coin from '../../components/Coin/Coin.js'

describe('Coin Component', () => {
  let wrapper;
  beforeEach( () => {
    wrapper = shallow(
      <Coin
        name="Sample Coin"
        logo="https://via.placeholder.com/150"
        id={1}
        key={1}
        symbol="SC"
        price={22.22}
        marketCap={222333444.23}
        percentChangeDay={1.23}
        percentChangeHour={2.44} 
        percentChangeSevenDays={-2.56}
        favIcon={<FontAwesomeIcon icon={faStar} />}
        favoritesList={[1,2,3]}
      />
    )
  })

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Router>
      <Coin
        name="Sample Coin"
        logo="https://via.placeholder.com/150"
        id={1}
        key={1}
        symbol="SC"
        price={22.22}
        marketCap={222333444.23}
        percentChangeDay={1.23}
        percentChangeHour={2.44} 
        percentChangeSevenDays={-2.56}
        favIcon={<FontAwesomeIcon icon={faStar} />}
        favoritesList={[1,2,3]}
      />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders a single table row with class rTableRow', () => {
    expect(wrapper.find('.rTableRow').length).toBe(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should have 7 columns of data', () => {
    expect(wrapper.find('.rTableCell').length).toEqual(7)
  })
  
  it('should add the "isFavorite" class to the first cell when id is included in favorites prop', () => {
    expect(wrapper.find('.rTableCell').at(0).hasClass('isFavorite')).toEqual(true)
  })
  
  it('should NOT add the "isFavorite" class to the first cell when id is included in favorites prop', () => {
    wrapper = shallow(
      <Coin
        name="Sample Coin"
        logo="https://via.placeholder.com/150"
        id={11}
        key={1}
        symbol="SC"
        price={22.2222}
        marketCap={222333444.233}
        percentChangeDay={1.23}
        percentChangeHour={2.44} 
        percentChangeSevenDays={-2.56}
        favIcon={<FontAwesomeIcon icon={faStar} />}
        favoritesList={[1,2,3]}
      />
    )
    expect(wrapper.find('.rTableCell').at(0).hasClass('isFavorite')).toEqual(false)
  })

  it('should convert prices to currency format in USD ($)', () => {
    expect(wrapper.find('.rTableCell').at(2).text()).toEqual('$22.22')
    expect(wrapper.find('.rTableCell').at(6).text()).toEqual('$222,333,444')
  })
  
  it('should add the green class for positive and red for negative percent changes', () => {
    expect(wrapper.find('.rTableCell').at(3).find('span').hasClass('green')).toEqual(true)
    expect(wrapper.find('.rTableCell').at(4).find('span').hasClass('green')).toEqual(true)
    expect(wrapper.find('.rTableCell').at(5).find('span').hasClass('red')).toEqual(true)
  })
})
