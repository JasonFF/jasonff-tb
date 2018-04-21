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
// setInterval(() => {
  (async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
      console.info('Requesting', requestData.url);
    });
    let url = 'https://item.taobao.com/item.htm?spm=a230r.7195193.1997079397.8.qaVREc&id=567880147066&abbucket=3' // js
    // let url = 'https://item.taobao.com/item.htm?spm=a1z10.1-c.w1004-17519367055.1.18c76aa2vV60PY&id=565125865250'
    const status = await page.open(url);
    const content = await page.property('content');
    console.log(content);
  
    await instance.exit();
  })();
// }, 1000)

