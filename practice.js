const request = require('request');
var cheerio = require('cheerio')

const options = {
    url : 'https://newsstand.naver.com/?list=ct1&pcode=028',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    }
    
}

request(options, (error, response, html) => {

    if(error) throw error;
    let foodList = [];
    $ = cheerio.load(html);

    console.log(html);
})


