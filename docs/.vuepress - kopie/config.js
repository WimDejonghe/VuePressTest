module.exports = {
    title: 'WebStekWim2',
    description: 'Short introduction Iot',
    themeConfig: {
      nav: [
      ],
      sidebar: 
        [ '/NodeRed/', '/microBit/', '/esp32/' ,'/groteP/' , '/serial/', '/spi/', '/i2c/' , '/mqtt/', ],
        

            
              
               
      sidebarDepth: 1,
      repo: 'WimDejonghe/VuePressTest',
      docsDir: 'docs',
      docsBranch: 'master'
    },
    markdown: {
      lineNumbers: true,
    },
    serviceWorker: true,
    plugins: [
      ['vuepress-plugin-zooming', {
        // selector for images that you want to be zoomable
        // default: '.content img'
        selector: 'img',
  
        // make images zoomable with delay after entering a page
        // default: 500
        // delay: 1000,
  
        // options of zooming
        // default: {}
        options: {
          bgColor: 'black',
          zIndex: 10000,
        },
      }],
     
      
    ],
  }