// var fetch = require('node-fetch')

// var url = 'https://count.taobao.com/counter3?_ksTS=1524235200291_115&callback=jsonp116&inc=ICVT_7_565125865250&sign=54164085e844f1d29c2793f96a8caa2862c7a&keys=DFX_200_1_565125865250,ICVT_7_565125865250,ICCP_1_565125865250,SCCP_2_61645869'

// var index = 0

// setInterval(() => {
//   fetch(url).then(res => res.text()).then(res => {
//     index++
//     console.log(res)
//     console.log(index)
//   })
// }, 100)

const phantom = require('phantom');
setInterval(() => {
  (async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
      console.info('Requesting', requestData.url);
    });
  
    const status = await page.open('https://item.taobao.com/item.htm?spm=a1z10.1-c-s.w137644-18145789117.26.43da45e7NlWPkw&id=567584172920');
    const content = await page.property('content');
    console.log(content);
  
    await instance.exit();
  })();
}, 1000)

