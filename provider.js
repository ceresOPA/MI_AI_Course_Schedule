function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {//函数名不要动
   let iframe1 =   document.getElementsByTagName('iframe')[1].contentDocument;
   return iframe1.getElementsByClassName('Nsb_pw')[0].innerHTML;
   
  }