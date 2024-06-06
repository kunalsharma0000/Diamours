const convertCurrency = async (amount, currency) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
            params: {
                from: 'INR',
                to: currency,
                amount: amount.toString()
            },
            headers: {
                'X-RapidAPI-Key': 'e3b36588e0msh1ab78a2e4e968e9p16f796jsn5163a02d8de8',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.result;
    } catch (error) {
        console.error(error);
        // Handle error
    }
};
