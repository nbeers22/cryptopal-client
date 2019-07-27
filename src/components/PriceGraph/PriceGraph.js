import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import config from '../../config.js'
import './PriceGraph.css'

export default class PriceGraph extends Component {

  constructor(props){
    super(props);
    this.state = {
      numDays: 30,
      coinSlug: '',
      options: {
        chart: {
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: `Price History - 30 Days`,
          align: 'center',
          num: 20
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      },
      series: [{
          name: "Price USD",
          data: []
      }],
    }
  }

  componentWillReceiveProps(props){
    const url = `${config.API_URL}/coins/${props.slug}/history/${this.state.numDays}`;
    this.setState({
      coinSlug: props.slug
    });
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response)
    })
    .then( data => this.setGraphData(data))
  }

  handleButtonClick = event => {
    document
      .getElementsByClassName('active')[0]
      .classList
      .remove('active')
    event.target.classList.add('active')
    this.setState({
      numDays: event.target.dataset.days
    },() => this.getGraphData(this.state.numDays))
  }

  getGraphData(numDays){
    const url = `${config.API_URL}/coins/${this.state.coinSlug}/history/${this.state.numDays}`;
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response)
    })
    .then( data => this.setGraphData(data))
  }

  setGraphData(data){
    const xaxisCats = [];
    const yaxisPrices = [];
    const priceData = data.prices.forEach( (day,index) => {
      const dateStr = new Date(day[0]);
      const date = dateStr.toLocaleString();
      yaxisPrices.push(day[1].toFixed(2))
      xaxisCats.push(date)
    });
    this.setState({
      options:{
        xaxis: {
          categories: xaxisCats
        }
      },
      series: [{
        data: yaxisPrices
      }],
    })
  }

  render() {
    return (
      <div className="PriceGraph">
        <div className="btn-group">
          <button data-days={1} onClick={this.handleButtonClick}>24 Hours</button>
          <button data-days={7} onClick={this.handleButtonClick}>7 Days</button>
          <button data-days={14} onClick={this.handleButtonClick}>14 Days</button>
          <button data-days={30} onClick={this.handleButtonClick} className="active">30 Days</button>
        </div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
        </div>
      </div>
    );
  }
}
