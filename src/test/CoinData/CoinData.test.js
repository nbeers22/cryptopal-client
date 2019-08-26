import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import PriceGraph from '../../components/PriceGraph/PriceGraph.js'
import Converter from '../../components/Converter/Converter.js'
import RedditFeedEntry from '../../components/RedditFeedEntry/RedditFeedEntry.js';
import CoinLinksTable from '../../components/CoinLinksTable/CoinLinksTable.js';
import CoinDataStats from '../../components/CoinDataStats/CoinDataStats.js';
import config from '../../config.js'
import loader from '../../images/loading.gif'
import Trophy from '../../components/CoinData/Trophy.js';
import CoinData from '../../components/CoinData/CoinData.js'

describe('CoinData Component',  () => {
  let wrapper,fetchSpy
  beforeEach( async () => {
      fetchSpy = jest.spyOn(window, 'fetch');
      wrapper = await shallow(
        <CoinData.WrappedComponent 
          match={{ params: { coin_id: 1 } }}
        />
      )
  })

  it("should render content if initial data is available", () => {
    expect(fetchSpy).toBeCalled();
    // console.log(fetchSpy)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
  // it('renders without errors', async () => {
    // const instance = wrapper.instance();
    // Now we call the componentDidMount event, telling the component that it mounted. But because
    // we called it manually we are able to await for it to resolve. This makes sure the promise
    // for the method is completed before going on with the code.
    // await instance.componentDidMount();
  // })

})
