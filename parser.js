function scheduleHtmlParser(html) {
    console.log("html",html);
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    let result = []
    console.log("table",$('#kbtable').find('tr')[2]);
    $('#kbtable').find('tr').each(function(i,elem){
        console.log("rankParent",i);
        let courseItem = {};
        console.log("courseItemZeros",courseItem);
        $(this).find('td').each(function(si,selem){
            console.log("rankChildren",si);
            console.log($(this).find('.kbcontent'));
          
            if($(this).find('.kbcontent').length!=0){
                console.log($(this).find('.kbcontent')[0].children[0].data);
                if( $(this).find('.kbcontent')[0].children[0].data=='&nbsp;'){
//                     console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
                    return true;
                }
                courseItem['name'] = $(this).find('.kbcontent')[0].children[0].data;

                console.info("12311111111111111111111111111111111111111");
                console.info($(this).find('.kbcontent').find('font').text());
                console.info("--------------------------------------------");
                $(this).find('.kbcontent').find('font').each(function(fi,felem){
                    console.log($(this).text());
                    if(fi==2){
                       courseItem['position'] = $(this).text(); 
                    }
                    if(fi==0){
                       courseItem['teacher'] = $(this).text();
                    }
                    if(fi==1){
                        let week = [];
                        let str = $(this).text();
                        if(str.split('-').length>=3){
                            let weekBegin = $(this).text().slice(0,str.indexOf('-'));
                            let weekEnd = $(this).text().slice(str.indexOf('-')+1,str.indexOf('('));
                          
                            for(let w=parseInt(weekBegin);w<=parseInt(weekEnd);w++){

                                week.push(w);

                            }
                            courseItem['weeks'] = week;
                        }else{
                            week.push(parseInt(str.slice(0,str.indexOf('('))));
                                courseItem['weeks'] = week;
                        }
                      
                    }

                })
                
                courseItem['day'] = si+1;
                courseItem['sections'] = [];
                courseItem['sections'].push({"section": 2*i-1});
                courseItem['sections'].push({"section": 2*i});
                let copy = JSON.parse(JSON.stringify(courseItem));
                result.push(copy);
//                 console.info("courseItem",copy);
//                 courseItem['sections'] = {
//                         "section":2*i
//                  }
//                  copy = JSON.parse(JSON.stringify(courseItem));
//                 result.push(copy);


            }
           
        })
    })
//     debugger;
//     let tbody = $('#kbtable').children('tbody')[0].children('tr');

//     for(let i=1;i<tbody.length-1;i++){

//         let tr = tbody[1].children;
//         let courseItem = {};
//         for(let j=1;j<tr.length;j++){

//             let td = tr[j];
//             let info = td.innerText.split('\n');
//             courseItem['name'] = info[0];
//             courseItem['position'] = info[3];
//             courseItem['teacher'] = info[1];
//             let weekBegin = info[2].slice(0,1);
//             let weekEnd = info[2].slice(2,3);
//             let week = [];
//             for(let w=weekBegin;w<=weekEnd;w++){

//                 week.push(w);

//             }
//             courseItem['day'] = j;
//             courseItem['sections'] = {
//                 "section":2*j-1
//             }


//         }

//         console.log("courseItem",courseItem);
//         result.push(courseItem);
//         courseItem['sections'] = {
//                 "section":2*j
//          }
//         result.push(courseItem);


//     }

    console.info(JSON.stringify(result));

    let returnData = {};
    returnData['courseInfos'] = result;
    console.log("returnData",JSON.stringify(returnData));
//     return returnData;
    return { courseInfos: result }

    



}