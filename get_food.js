const {
    crawling_data
} = require('./crawling.js')
var cheerio = require('cheerio')
const fs = require('fs')

exports.foodList = crawling_data('http://www.kmou.ac.kr/coop/dv/dietView/selectDietDateView.do?mi=1189').then((result) => {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(result);
        const $title_List = $("div.BD_table table.detail_tb thead tr") //.children("table.detail_tb");
        const $food_List = $("div.BD_table") //.children("table.detail_tb");
        let menuList = [];
        $title_List.children("th").each(function (i = 0, elem) {
            menuList[i] = {
                title: $(this).text()
            }
        });
        // if($food_List.find('tbody tr td.ta_c').text() == ''){
        //     menuList[i]["food"] = '';
        // }

        $food_List.children("table.detail_tb").find("td.ta_c").each(function (i = 0, elem) {
            menuList[i]["food"] = $(this).text()
            menuList[i].food = menuList[i].food.replace(/\t/g, '')
        });

        console.log(menuList)
        menu_text = JSON.stringify(menuList)
        fs.writeFileSync('test.json', menu_text, 'utf-8')
        resolve(menuList);
    });
}).catch((error) => {
    console.error(error);
});
