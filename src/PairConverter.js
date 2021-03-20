import React from 'react';
import { json, checkStatus } from './utils';
import Chart from 'chart.js'

export class PairConverter extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currency1: 'EUR',
      currency2: 'USD',
      rate: '',
      amount1: '',
      amount2: '',
    };
    this.handleCurrency1Change = this.handleCurrency1Change.bind(this);
    this.handleCurrency2Change = this.handleCurrency2Change.bind(this);
    this.handleAmount1Change = this.handleAmount1Change.bind(this);
    this.handleAmount2Change = this.handleAmount2Change.bind(this);
    this.chartRef = React.createRef();
  };

  getRates () {
    let { currency1, currency2 } = this.state;
    console.log(currency1, currency2);
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency1}&symbols=${currency2}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response.rates);
        var keys = Object.keys( response.rates );
        var key = keys[0];
        var value = response.rates[key];
        console.log(value);
        this.setState({rate: value});
        this.setState({amount1: '', amount2: ''})
      })
      .catch(error => {
        console.error(error.message);
      })
  }


  getHistoricalRates = (currency1, currency2) => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

      fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${currency1}&symbols=${currency2}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }

          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[currency2]);
          const chartLabel = `${currency1}/${currency2}`;
          this.buildChart(chartLabels, chartData, chartLabel);
        })
        .catch(error => console.error(error.message));
    }

    buildChart = (labels, data, label) => {
      const chartRef = this.chartRef.current.getContext("2d");

      if (typeof this.chart !== "undefined") {
        this.chart.destroy();
      }

      this.chart = new Chart(this.chartRef.current.getContext("2d"), {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: label,
              data,
              fill: false,
              tension: 0,
            }
          ]
        },
        options: {
          responsive: true,
        }
      })
    }




  handleCurrency1Change(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.getRates,
  this.getHistoricalRates(event.target.value, this.state.currency2),);
}
  handleCurrency2Change(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    },this.getRates,
  this.getHistoricalRates(this.state.currency1, event.target.value),);
  }
  toCurrency1(amount, rate) {
    return amount * (1 / rate);
  }
  toCurrency2(amount, rate) {
    return amount * rate;
  }
  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }
  handleAmount1Change(event) {
    const amount2 = this.convert(event.target.value, this.state.rate, this.toCurrency2);
    if (this.state.rate !==0) {
    this.setState({
      amount1: event.target.value,
      amount2
    });
  }
  }
  handleAmount2Change(event) {
    const amount1 = this.convert(event.target.value, this.state.rate, this.toCurrency1);
    if (this.state.rate !==0) {
    this.setState({
      amount2: event.target.value,
      amount1
    });
  }
  }

  componentDidMount () {
    const { currency1, currency2 } = this.state;
    this.getRates();
    this.getHistoricalRates(currency1, currency2);
  }


  render () {
    const { currency1, currency2, base, rate, amount1, amount2 } = this.state;
    console.log(currency1);
    console.log(currency2);
    return (
      <React.Fragment>
      <form className="mb-4">
       <div className="d-block d-lg-inline">
        <input className="mx-1" value={amount1} onChange={this.handleAmount1Change} type="number" placeholder="amount" />
          <select name="currency1" value={currency1} onChange={this.handleCurrency1Change}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PHP">PHP</option>
            <option value="PLN">PLN</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="ZAR">ZAR</option>
           </select>
          </div>
        <input className="mx-1" value={amount2} onChange={this.handleAmount2Change} type="number" placeholder="amount" />
          <select name="currency2" value={currency2} onChange={this.handleCurrency2Change}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PHP">PHP</option>
            <option value="PLN">PLN</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="ZAR">ZAR</option>
           </select>
      </form>
      <canvas ref={this.chartRef} />
      </React.Fragment>
    )
  }
}
