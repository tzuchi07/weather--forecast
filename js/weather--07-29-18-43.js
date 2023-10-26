
// --------------筆記--------------------------
// 1.複製一段fetch的代碼
// 2.到氣象局平台找api連結
// 3.我們用fetch來達成的工作:api回傳資料---->用function取出我們要使用的資料
//                          ------->用function將要表現的資料顯示在網頁裡


// -------------------------------------------
const cityAll = [

    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'],
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣'],
    ['臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣'],
    ['臺南市', '高雄市', '屏東縣'],
    ['宜蘭縣', '花蓮縣', '臺東縣'],
    ['澎湖縣', '金門縣', '連江縣'],

]

let nowCityAll = cityAll[0];
let northAll = cityAll[1];
let middleAll = cityAll[2];
let southAll = cityAll[3];
let eastAll = cityAll[4];
let outerAll = cityAll[5];


//-----------------放有用的程式資料-----------------------

let orgData = [];
let wx = '';
let regionName = [];
let card_number = '';
let numberGet = 0;


// --------------------------------------------------------

const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-79BCCA29-7E83-4EB6-ADBC-8818C8FAB1BC"


fetch(url)
    .then(function (response) {
        return response.json();

    })
    .then(function (result) {
        organizationDate(result);
        arrange_cityAll();

    });



function organizationDate(data) {
// 不懂下面這一行怎麼命名的
    const locationAll = data.records.location;
    console.log(locationAll);

    locationAll.forEach(function (location, index) {
        let locationName = location.locationName;
        let loc_wE0_t0 = location.weatherElement[0].time[0];
        let wxCondition = loc_wE0_t0.parameter.parameterName;
// ---------------去掉太長的時間----(起始)------------------------------------
        let startTime = loc_wE0_t0.startTime;
        // console.log(startTime);

        let  startTime_15 = '';
        for(aa=0; aa<16; aa++){
             startTime_15 += startTime[aa];
        } 
        console.log(startTime_15);

// ---------------去掉太長的時間-------(終時)---------------------------------
        let endTime = loc_wE0_t0.endTime;

        let  endTime_15 = '';
        for(bb=0; bb<16; bb++){
            endTime_15 += endTime[bb];
        } 
        console.log(endTime_15);
// --------------------------------------------------------------------

        let minT = location.weatherElement[2].time[0].parameter.parameterName;
        let maxT = location.weatherElement[4].time[0].parameter.parameterName;
        let pop = location.weatherElement[1].time[0].parameter.parameterName;
        let ci = location.weatherElement[3].time[0].parameter.parameterName;

        // console.log(locationName, wxCondition, loc_wE0_t0, startTime, endTime, minT);
        //   *** 利用程式名稱當key***
        orgData[locationName] = {

            'wxCondition': wxCondition,
            'minT': minT,
            'maxT': maxT,
            'startTime': startTime_15,
            'endTime': endTime_15,
            'pop': pop,
            'ci': ci,
        }
    });

    console.log(orgData);
}    

// --筆記：---- console.log(orgData)後，其中一個object結果如下----------------------
// 南投縣:{
//     "wxCondition": "多雲午後短暫雷陣雨",
//     "minT": "30",
//     "maxT": "33",
//     "startTime": "2023-07-29 12:00",
//     "endTime": "2023-07-29 18:00",
//     "pop": "40",
//     "ci": "悶熱"
//      }



// -------------------------------------------

   

// -------------全台灣-頁面一-----------------------
function arrange_cityAll() {

    regionName = nowCityAll;

    changePage(regionName);

    numberGet = 0;
    
}

// -----------北部----------頁面二--------------------------------
function arrange_northAll() {

    regionName = northAll;

    changePage(regionName);

    numberGet = 1;
}

// -----------中部------頁面三------------------------
function arrange_middleAll() {
    regionName = middleAll;

    changePage(regionName);

    numberGet = 2;
}

// ------------南部 -----頁面四-----------------------------
function arrange_southAll() {
    regionName = southAll;

    changePage(regionName);

    numberGet = 3;
}

// -----------東部------- 頁面五-------------------------
function arrange_eastAll() {
    regionName = eastAll;

    changePage(regionName);

    numberGet = 4;
}

// ----------外島--------頁面六------------------------------
function arrange_outerAll() {
    regionName = outerAll;

    changePage(regionName);

    numberGet = 5;
}

// ------------------------------------------------------------------------


function changePage(regionName){
    const cardRegion = document.querySelector('.card-region');
    cardRegion.innerHTML = '';

// ---筆記:-----目前取出的orgData這個類陣列裡面，每個縣市的排序不是我們要的，
// -------------現在要做的是，按照我們要的縣市排序依序取出縣市資料來使用。
// ------------ 我們訂定的縣市排序是nowCityAll這個矩陣，透過for each迴圈提供的
// -------------cityData是物件，新的陣列由一個一個接續的cityData組成--
// -------------這邊似乎只是按我們要的順序依序取出物件(cityData)，要怎麼形成新的陣列?-----------
    regionName.forEach(function (city, index) {
        // console.log(city,orgData);
        let cityData = orgData[city];
        // console.log(orgData['基隆市']);
// ----- console.log(orgData['基隆市'])後，就會得到基隆市的資料如下，
// ------{wxCondition: '多雲', minT: '28', maxT: '31',
//-------startTime: '2023-07-29 18:00', endTime: '2023-07-30 06:00', …}


        // console.log(cityData);

        cardRegion.innerHTML +=
        ` <div class="card">
                <div>${city}</div>
                <div class="weather">${cityData.wxCondition}</div>
                <div>
                    <div>${cityData.startTime}</div>
                    <div>至</div>
                    <div>${cityData.endTime}0</div>
                </div>
                <div>${cityData.minT} ~ ${cityData.maxT} °C</div>
                
                <div>降雨機率 ${cityData.pop}%</div>
                <div>${cityData.ci}</div>
            </div>`
        ;
      
       
// ------------依照天氣做變圖------------------------------------------------------------
         
             // console.log(weather);
             // console.log(cityData.wxCondition);
        
            card_number = 'card_' + numberGet;

            // console.log( card_number);
            
            card_number = document.querySelectorAll('.card');
         
            page = card_number[index];
            console.log(page);
            wx = cityData.wxCondition;
            changeImage(page);

           

    })//forEach結束

    }//regionName  結束





// ---------------------------------------------------------------------------------
function changeImage(page, index) {
    
    console.log(page);

    if (wx.includes('雨') == true){
        page.style.backgroundImage='url(./圖檔/rainyglass3.jpg)';

    } 
    
    if(wx.includes('午後短暫雷陣雨') == true){
        page.style.backgroundImage='url(./圖檔/yellow-rain-3.jpg)';
    }

    if (wx.includes('雨') == false && wx.includes('陰') == true){
        page.style.backgroundImage='url(./圖檔/cloudy7.webp)';
    }

    if (wx.includes('雨') == false && wx.includes('晴') == false && wx.includes('多雲') == true){
        page.style.backgroundImage='url(./圖檔/cloudy7.webp)';}

    if (wx.includes('雨') == false && wx.includes('晴') == true){
        page.style.backgroundImage='url(./圖檔/sunny3.jpg)';}
    
    if (wx.includes('多雲') == true && wx.includes('晴') == true){
        page.style.backgroundImage='url(./圖檔/cloudy2.jpg)';  
    }

    }//換圖function結束

    // --------------下面這個寫法不知道有沒有漏洞，上面的可以就不想改了~--------------------------------------------

    // if (wx.includes('雨') == true){
    //     // console.log('我在 全台灣');
    //     page.style.backgroundImage='url(./圖檔/rainyglass3.jpg)'; 

    // } else if (wx.includes('陰') == true) {
    //     // console.log('我在 全台灣');
    //     page.style.backgroundImage='url(./圖檔/cloudy7.webp)';
    
    // } else if (wx.includes('多雲') == true) {
    //     // console.log('我在 全台灣');
    //     page.style.backgroundImage='url(./圖檔/cloudy7.webp)';
    // } else if (wx.includes('晴') == true) {
    //     // console.log('我在 全台灣');
    //     page.style.backgroundImage='url(./圖檔/sunny3.jpg)'

    // }else if (wx.includes('多雲') == true && wx.includes('晴') == true){
    //     // console.log('我在 全台灣');
    //     page.style.backgroundImage='url(./圖檔/cloudy2.jpg)';  
    // }

