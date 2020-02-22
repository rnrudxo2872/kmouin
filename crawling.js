const request = require('request');
var cheerio = require('cheerio')

const options = {
    url: 'http://www.kmou.ac.kr/coop/dv/dietView/selectDietDateView.do?mi=1189',
    //encoding: '',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;1=0.9*/*;q=0.8',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding': null,
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive'
    }
}

function getbody(callback) {
    return new Promise(function (resolve, reject) {
        request(options, (error, response, html) => {

            if (error) throw error;
            resolve(html)
        })
    })
}

getbody().then(function food(tableData) {
    $ = cheerio.load(tableData);
    const $title_List = $("div.BD_table table.detail_tb thead tr")//.children("table.detail_tb");
    const $food_List = $("div.BD_table")//.children("table.detail_tb");
    let menuList = [];
    $title_List.children("th").each(function (i=0, elem) {
        menuList[i] ={
            title: $(this).text()
        }
    });
    // if($food_List.find('tbody tr td.ta_c').text() == ''){
    //     menuList[i]["food"] = '';
    // }
    
    $food_List.children("table.detail_tb").find("td.ta_c").each(function (i=0, elem) {
        menuList[i]["food"] = $(this).text()
        menuList[i].food = menuList[i].food.replace(/\t/g,'')
    });
    

    console.log(menuList)
})
