let card_headings=document.getElementsByClassName("card-img-overlay");
let cards=document.getElementsByClassName("card");
let main_row=document.querySelectorAll(".news-container .row");
let api_key="9096badb1ebf85a7b6d90d339b36843d";
console.log("using rapid api");
const options = {
	method: 'GET',
	headers: {
        
		'x-api-key': config.apikey
	}
};
// var pageno=1;
 //var homeNewsUrl=`http://api.mediastack.com/v1/news?access_key=${api_key}&sources=bbc,cnn&limit=100`;
var homeNewsUrl='https://api.newscatcherapi.com/v2/latest_headlines?countries=IN,US,AU,UK,RU&lang=en&page_size=100';
var type="homeNews";
var newsPointer=0;
//localStorage.clear();
let sampleCard=main_row[0].children[0].cloneNode(true);
//main_row[0].children[0].style.display="none";


localStorage.setItem("load_date","Tue Jun 28 2022");
checkDate();
function checkDate(){
var todays=new Date();
console.log("stored date = ",localStorage.getItem("load_date"));
let x=todays.toDateString()==localStorage.getItem("load_date");
if(!x){
    localStorage.setItem("load_date",todays.toDateString());
    fetch(homeNewsUrl,options).then((response)=>{
        //console.log(response.json());
        return response.json();
    },(error)=>{
            console.log("error while fetching data from api");
    }).then((data)=>{
        console.log(data);
        localStorage.setItem(type,JSON.stringify(data));
        console.log(localStorage.getItem(type));
        loadNews(); 
    })
    // .catch(error=>{
    //     console.log("error occured while storing in localStorage "+error);
    // });
}
//console.log("stored date = ",localStorage.getItem("load_date"));
//console.log("today's date = ",todays.toDateString());
}

function loadNews(){
    let newsobj=JSON.parse(localStorage.getItem(type));
    let sampleCard;
    let temp;
    for(let i=newsPointer;i<=newsPointer+24;i++)
    {
        sampleCard=main_row[0].children[0].cloneNode(true);
        sampleCard.children[0].children[0].src=newsobj["articles"][i]["media"];
        temp=sampleCard.children[0].children[2].children[0].children[0]; // news title box
        temp.innerHTML=newsobj["articles"][i]["title"]; // news title 
        temp.href=newsobj["articles"][i]["link"];    // url hidden in news title
        main_row[0].appendChild(sampleCard);
    }
    newsPointer+=25;
}



