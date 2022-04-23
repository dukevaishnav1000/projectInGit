let card_headings=document.getElementsByClassName("card-img-overlay");
let cards=document.getElementsByClassName("card");
let main_row=document.querySelectorAll(".news-container .row");
let api_key="e0d1b5c8f32b46308fead87de8e1bb4a";
var flag=true;
var pageno=1;
var urlglobal=`https://newsapi.org/v2/everything?q=DEFAULT&apikey=${api_key}`;
var headingPointer=0;//points to recently loaded heading no.
var datanew;

console.log(urlglobal);

firstPageLoad(urlglobal);

//fetchData() will help to set/update datanew variable with new values
async function fetchData(url){
    console.log("url  used by fetch function "+url);
    return new Promise((res,rej)=>{fetch(url).then(dataString=>{
        return dataString.json()
    },error=>{
        console.log(error);
    }).then(data=>{
        console.log(data);
        datanew=data;
        console.log(url);
        res(data);   
    })
    
})

}

async function firstPageLoad(url){
    url=`https://newsapi.org/v2/everything?q=DEFAULT&apikey=${api_key}`;
    let p1=await fetchData(url);
    // await p1.then((data)=>{

    
        //first news-card in page is required to be populated separately here and is predefined in html page so that clone of it can be used to make more cards in loadMore() function 
        card_headings[0].children[0].innerText=datanew.articles[0].title;
        cards[0].children[0].src=datanew.articles[0].urlToImage;
        headingPointer=0;
        loadMore();

        console.log("p1 " +p1);
        
        window.addEventListener("scroll",()=>
        {      
                console.log("hi");
                
                document.getElementsByClassName("loaderHolder")[0].style.top=`${window.scrollY}`;
                if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-20 && flag)
                {   
                    document.getElementsByClassName("loaderHolder")[0].style.display="block";
                    console.log("datanew "+datanew);
                    loadMore();
                    flag=false;
                    p1=new Promise((res,rej)=>{
                        setTimeout(()=>{document.getElementsByClassName("loaderHolder")[0].style.display="none";
                        res("promise resolved");
                        },4000);
                    }).then((resmsg)=>{flag=true},rejmsg=>rejmsg);
                    
                //    document.getElementsByClassName("loaderHolder")[0].style.display="none";

                
                }
        })

    // })

}


// fetch(url).then(dataString=>{
//     return dataString.json()
// },error=>{
//     console.log(error);
// }).then(data=>{
//     console.log(data);
    
//     console.log(url);   

//         card_headings[0].children[0].innerText=data.articles[0].title;
//         cards[0].children[0].src=data.articles[0].urlToImage;
//     headingPointer=0;
//     loadMore(data);
//     return data;
// }).then((data)=>{
//                 window.addEventListener("scroll",()=>
//                 {      
//                         console.log("hi");
                        
//                         document.getElementsByClassName("loaderHolder")[0].style.top=`${window.scrollY}`;
//                         if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-20 && flag)
//                         {   document.getElementsByClassName("loaderHolder")[0].style.display="block";
//                             console.log(data);
//                             loadMore(data);
//                             flag=false;
//                             p1=new Promise((res,rej)=>{
//                                 setTimeout(()=>{document.getElementsByClassName("loaderHolder")[0].style.display="none";    
//                                 res("promise resolved");
//                                 },2000);
//                             }).then((resmsg)=>{flag=true},rejmsg=>rejmsg);
                            
//                         //    document.getElementsByClassName("loaderHolder")[0].style.display="none";

                        
//                         }
//                 })

//             })


function resetUrlOrPointer(){
    if(headingPointer>=19){
        headingPointer=0;
        pageno++;      
       let tempurl=urlglobal+`&page=${pageno}`;
       fetchData(tempurl);
       console.log("url and pointer were reset "+headingPointer+" "+tempurl);
    }


}



//loadMore() function  will be called when we need to create new articles by using data from datanew array
function loadMore(){
    let i;
    resetUrlOrPointer();
    for(i=1;i<=19;i++)
    {   

        console.log("i "+i);
        console.log("headingPointer "+headingPointer);
        let temp_card=main_row[0].children[0].cloneNode(true); 
        console.log(temp_card); 
        
        temp_card.children[0].children[0].src=datanew.articles[headingPointer+1].urlToImage;
        temp_card.children[0].children[2].children[0].innerText=datanew.articles[headingPointer+1].title;
        main_row[0].appendChild(temp_card);
        headingPointer++;
        resetUrlOrPointer();
    }
    //headingPointer+=8;
    
}


function regionalNews()
{
    if(navigator.geolocation)
    {
     navigator.geolocation.getCurrentPosition(position => {
         long=position.coords.longitude;
         lat=position.coords.latitude;
        let api_key="716705298df9526d77246c79bb2be025"
        const api_string= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`

        fetch(api_string)
        .then(response => {
            return response.json()
        }).then(data =>
            {   console.log(data)
                
            })
    })   
    }
    else{
        alert("unable to fetch your location");
    }
}