const request = require('request');
var cheerio = require('cheerio')

const options = {
    url : 'http://www.kmou.ac.kr/coop/dv/dietView/selectDietDateView.do?mi=1189',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    }
}

request(options, (error, response, html) => {

    if(error) throw error;
    let foodList = [];
    $ = cheerio.load(html);
    const $bodyList = $("div.BD_table").children("table.detail_tb");

    $bodyList.each(function(i, elem) {
      foodList[i] = {
          title: $(this).find('thead tr th').text(),
          date: $(this).find('tbody tr td.ta_c').text()
      };
    });
    /*for(let i = 0 ; i < ulList.length; i ++){
        ulList[i].date = ulList[i].date.replace(/\t/g,'')
    }*/
    console.log(foodList)
})


