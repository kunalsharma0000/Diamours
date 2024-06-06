// redux/reducers/currencyRateReducer.js

const initialState = {
  rate: 1, // Default currency rate
  currency : 'INR', // Default currency
};

const toDate = new Date().toISOString().split('T')[0];

const url = `https://${toDate}.currency-api.pages.dev/v1/currencies/inr.json`;

const currencyRate = {};

(async () => {
  const response = await fetch(url);
  var data = await response.json();
  data = data.inr;
  // console.log(data);
  currencyRate['inr'] = 1;
  currencyRate['usd'] = data.usd;
  currencyRate['eur'] = data.eur;
  currencyRate['gbp'] = data.gbp;
})();

const currencyRateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USD':
      return { ...state, rate: currencyRate['usd'], currency :  'USD'}; // Update currency rate
    case 'EUR':
      return { ...state, rate: currencyRate['eur'], currency :  'EUR'}; // Update currency rate
    case 'GBP':
      return { ...state, rate: currencyRate['gbp'], currency :  'GBP'}; // Update currency rate
    case 'INR':
      return { ...state, rate: 1, currency :  'INR'}; // Update currency rate
    default:
      return state;
  }
};

export default currencyRateReducer;
