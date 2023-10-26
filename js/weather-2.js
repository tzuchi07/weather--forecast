
let taiwan = document.querySelector('#taiwan');
let north = document.querySelector('#north');
let middle = document.querySelector('#middle');
let south = document.querySelector('#south');
let east = document.querySelector('#east');
let outer = document.querySelector('#outer');
let cardRegion = document.querySelector('.card-region')
let container = document.querySelector('.container')



// ------------台灣-----------------------------------------
taiwan.addEventListener('click',function(){
    arrange_cityAll();
})

// ------------北部-----------------------------------
north.addEventListener('click',function() {
    arrange_northAll();
    // container.style.height='2000px';
    // 改頁面長度動畫要調位置，暫時不做;
})


// --------------中部-----------------------------
middle.addEventListener('click',function() {
    arrange_middleAll();
})

// ----------------南部--------------------------
south.addEventListener('click',function(){
    arrange_southAll();
})

// --------------東部---------------------
east.addEventListener('click',function(){
    arrange_eastAll();
})

// -----------外島-------------------
outer.addEventListener('click', function(){
    arrange_outerAll(); 
})



