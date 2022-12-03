let card_headings=document.getElementsByClassName("card-img-overlay");
let cards=document.getElementsByClassName("card");
let main_row=document.querySelectorAll(".news-container .row");
let api_key="jbwSsxwZIy5SP2RVaLTVM8kXR3ZbHrt8osAsL-cJJcw";
let loader=document.getElementsByClassName("loaderHolder");
var endOfResults=document.getElementsByClassName("endOfResults");
let eorFlag=false;
let scrollinglock=false;
console.log("using newscatcherapi");
const options = {
	method: 'GET',
	headers: {
		'x-api-key': api_key
	}
};



var homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&page_size=100';
var type="homeNews";
var newsPointer=0;
let sampleCard=main_row[0].children[0].cloneNode(true);            
sampleCard.style.src="";
main_row[0].children[0].style.display="none";


setUrl();
function setUrl(){

var currenturl=window.location.href;
let params=new URL(currenturl).searchParams;
if(!params.has('specifics')){
firstLoad();   
console.log("its first load"); 
}
else
{   let x=params.get('specifics');
    switch(x){
        case '1': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=tech&page_size=100';
                  break;     
        case '2': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=entertainment&page_size=100';
                  break;     
        case '3': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=sport&page_size=100';
                  break;     
        case '4': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=politics&page_size=100';
                  break;
        case '5': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=travel&page_size=100';
                  break;     
        case '6': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=business&page_size=100';
                  break;     
        case '7': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=food&page_size=100';
                  break;     
        case '8': homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU,CA,MX&lang=en&topic=beauty&page_size=100';
                  break;     
       
                }
        type=x;
        firstLoad();
}
}

//firstLoad();
function firstLoad(){
localStorage.setItem("load_date","Tue Jun 28 2022");
loadRequired();
window.addEventListener("scroll",loadRequired);
}


async function checkDateAndLoad(){
var todays=new Date();
console.log("stored date = ",localStorage.getItem("load_date"));
let x;
if(todays.toDateString()==localStorage.getItem("load_date"))
x=true;
else
x=false;
if(!x){
    localStorage.setItem("load_date",todays.toDateString());
    fetch(homeNewsUrl,options).then((response)=>{
        return response.json();
    },(error)=>{
            console.log("error while fetching data from api");
    }).then((data)=>{
        console.log(data);
        localStorage.setItem(type,JSON.stringify(data));
        console.log(localStorage.getItem(type));
        newsPointer=0;
        //displayNews(); 
    })
    // .catch(error=>{
    //     console.log("error occured while storing in localStorage "+error);
    // });
}
//console.log("stored date = ",localStorage.getItem("load_date"));
//console.log("today's date = ",todays.toDateString());
}


function displayNews(){
    let newsobj=null;
    while(newsobj==null){
        newsobj=JSON.parse(localStorage.getItem(type));
        console.log("newsobj is "+newsobj);
    }
    let sampleCard;
    let limit=newsPointer+25;
    let temp;
    if(!eorFlag)
    {endOfResults[0].style.display="none";
    }
    while(newsPointer<=98 && newsPointer<=limit)
    {   try{
        console.log('newsPointer '+newsPointer+" limit is "+limit);
        sampleCard=main_row[0].children[0].cloneNode(true);
        sampleCard.style.display="block";
        try{
        sampleCard.children[0].children[0].src=newsobj["articles"][newsPointer]["media"];
        }catch(e){
            sampleCard.children[0].children[0].src=randomImage();
        }
        temp=sampleCard.children[0].children[2].children[0].children[0]; // news title box
        temp.innerHTML=newsobj["articles"][newsPointer]["title"]; // news title 
        temp.href=newsobj["articles"][newsPointer]["link"];    // url hidden in news title
        main_row[0].appendChild(sampleCard);
        ++newsPointer;}
        catch(error){
            console.log("error in display function while making news cards "+error);
        }
    }
    if(newsPointer>=99)
    {eorFlag=true;
     console.log("eorFlag is true");
    }
    else
    scrollinglock=false;
}

function loadRequired() {
    loader[0].style.top = `${window.scrollY}`;
    if (eorFlag)
    endOfResults[0].style.display = "block";
    else
    if (!scrollinglock && (window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 200) {
        scrollinglock=true;
            console.log("loading started");
            document.getElementsByClassName("loaderHolder")[0].style.display = "block";
            new Promise((res, rej) => {
                document.getElementsByClassName("loaderHolder")[0].style.display = "block";
                checkDateAndLoad();
                console.log("this line should come after data");
                setTimeout(() => {
                     //newsPointer=27;
                    res();
                },1800);
            }).then((data) => {
                displayNews();
                document.getElementsByClassName("loaderHolder")[0].style.display = "none";
            }, (failmsg) => {
                console.log("error in loadRequired " + failmsg);
                document.getElementsByClassName("loaderHolder")[0].style.display = "none";
            });
    }
}

function randomImage(){
    let arr=["images\\deerImage_alt.png","images\\rabbitImage_alt.webp","images\\puppiesImage_alt.jpg","images\\cuteRabbitImage_alt.jpg"]
    return arr[Math.floor(Math.random(0,1)*4)];
}