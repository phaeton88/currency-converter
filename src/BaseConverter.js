import React from 'react';
import { json, checkStatus } from './utils';
import './BaseConverter.css'

class BaseConverter extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currencyInput: 'EUR',
      base: '',
      rates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { currencyInput } = this.state;
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${currencyInput}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response);
        this.setState({base: response.base});
        this.setState({rates: response.rates});
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  render () {
    const { base, rates, currencyInput } = this.state;
    return (
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2>Base Converter</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Choose base currency
              <select name="currencyInput" className="mx-1" value={currencyInput} onChange={this.handleChange}>
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
            </label>
            <button type="submit" className="btn btn-primary mx-2">Go</button>
          </form>
          <h4>Base Currency: {base}</h4>
          {Object.keys(rates).filter(acronym => acronym !== base).map( (rate, index)=> {
              return <div key = {index}>
                 <span>{rate}:</span>
                 <span>{rates[rate].toFixed(2)}</span>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default BaseConverter;
