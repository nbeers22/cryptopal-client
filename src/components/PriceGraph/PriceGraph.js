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
      graphErrorMessage: "No Graph Data Available",
      graphError: false,
      pbottom: { paddingBottom: "5%" },
      options: {
        chart: {
          zoom: {
            enabled: true
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: ``,
          align: 'center',
          num: 20
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        colors: ['#23697a'],
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return `$${value.toFixed(2)}`;
            }
          },
        },
      },
      series: [{
          name: "Price USD",
          data: []
      }],
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      coinSlug: props.slug
    },this.getGraphData );
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
    const url = `${config.API_URL}/coins/${this.state.coinSlug}/history/${this.state.numDays || numDays}`;
    
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : this.setState({ graphError: true })
    })
    .then( data => {
      this.setGraphData(data)
    })
  }

  setGraphData(data){
    const xaxisCats = [];
    const yaxisPrices = [];
    if(data){
      data.prices.forEach( (day,index) => {
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
  }

  render() {

    const buttons = [
      { num: 1, time: "Day" },
      { num: 7, time: "Days" },
      { num: 14, time: "Days" },
      { num: 30, time: "Days" }
    ]
    const btnGroup = buttons.map( (btn, i) => (
      <button
        key={i}
        className={btn.num === 30 ? 'active' : undefined}
        data-days={btn.num}
        onClick={this.handleButtonClick}>{`${btn.num} ${btn.time}`}
      </button>
    ))

    const pbottom = this.state.graphError
                    ? { paddingBottom: "5%" }
                    : { paddingBottom: "0" }

    return (
      <section className="price-history" style={pbottom}>
        <div className="PriceGraph">
          <div className="container">
            <center><h2>Price History</h2></center>

            {
              !this.state.graphError
                ? <><div className="btn-group">
                    { btnGroup }
                  </div>
                  <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                  </div></>
                : <center style={{marginBottom: "0"}}><h3 style={{marginBottom: "0"}}>{ this.state.graphErrorMessage }</h3></center>
            }
            
          </div>
        </div>
      </section>
    )
  }
}
