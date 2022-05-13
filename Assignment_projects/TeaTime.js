let card_headings=document.getElementsByClassName("card-img-overlay");
let cards=document.getElementsByClassName("card");
let main_row=document.querySelectorAll(".news-container .row");
let api_key="e0d1b5c8f32b46308fead87de8e1bb4a";
var flag=true;// true here means no previous headings are being loaded and no loader is in progress
var pageno=1;
var urlglobal=`http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q=DEFAULT&apikey=${api_key}`;
var headingPointer=0;//points to recently loaded heading no.
var datanew;
var endOfResults=document.getElementsByClassName("endOfResults");

console.log(urlglobal);

firstPageLoad(urlglobal);

//fetchData() will help to set/update datanew variable with new values
async function fetchData(url){
    console.log("url  used by fetch function "+url);
    return new Promise((res,rej)=>{fetch(url).then(dataString=>{
        return dataString.json()
    },error=>{
        rej("error in fetchData()"+error);
    }).then(data=>{
        console.log(data);
        datanew=data;
        console.log(url);
        res(data);   
    },error=>{rej("error in fetchData()"+error)})    
})
}

async function firstPageLoad(url){
    url=`http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q=DEFAULT&apikey=${api_key}`;
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
                    
                    try{
                    loadMore();
                    
                    }
                    catch(error){
                    console.log("error occured");

                    document.getElementsByClassName("loaderHolder")[0].style.display="none";
                    flag=true;
                    }
                    flag=false;
                    p1=new Promise((res,rej)=>{
                        setTimeout(()=>{document.getElementsByClassName("loaderHolder")[0].style.display="none";
                        res("promise resolved");
                        },3500);
                    }).then((resmsg)=>{flag=true},rejmsg=>rejmsg);
                    

                //    document.getElementsByClassName("loaderHolder")[0].style.display="none";

                
                }
        })

    

}



async function resetUrlOrPointer(){
    if(headingPointer>=19){
        headingPointer=0;
        pageno++;      
       let tempurl=urlglobal+`&page=${pageno}`;
       await fetchData(tempurl);
       console.log("url and pointer were reset "+headingPointer+" "+tempurl);
    }


}



//loadMore() function  will be called when we need to create new articles by using data from datanew array
async function loadMore(){
    let i;
    await resetUrlOrPointer();
    for(i=1;i<=19;i++)
    {   

        console.log("i "+i);
        console.log("headingPointer "+headingPointer);
        let temp_card=main_row[0].children[0].cloneNode(true); 
        console.log(temp_card); 
        
        try{        
            temp_card.children[0].children[0].src=datanew.articles[headingPointer+1].urlToImage;
            temp_card.children[0].children[2].children[0].innerText=datanew.articles[headingPointer+1].title;   
            main_row[0].appendChild(temp_card);
            headingPointer++;
            await resetUrlOrPointer();     
            }
            catch(error){
            console.log("error occured");
            document.getElementsByClassName("loaderHolder")[0].style.display="none";
            flag=true;
            endOfResults[0].style.display="block";
            }


    }
    //headingPointer+=8;
    
}


function regionalNews()
{   console.log("main row "+main_row[0]);
    pageno=1;
    endOfResults[0].style.display="none";
    // main_row.innerHTMl="";
    
    let first_card=`<div class="col col-md-4 col-sm-6 col-12 m-0 mt-3">
                        <div class="card bg-dark text-white ">
                            <img src="images/tiger.jpg" class="card-img" alt="...">
                            <div class="hider"></div>
                            <div class="card-img-overlay">
                                
                                <h4 class="card-title mt"></h4>
                                <p class="card-text">Last updated 3 mins ago</p>
                            </div>
                        </div>
                    </div>`;

    main_row[0].innerHTML=first_card;

    if(navigator.geolocation)
    {let long,lat,api_key_location;
        let api_string_longlat;
        new Promise((res,rej)=>{
                                    navigator.geolocation.getCurrentPosition(position => 
                                    {
                                    long=position.coords.longitude;
                                    lat= position.coords.latitude;
                                    api_key_location="716705298df9526d77246c79bb2be025";
                                    api_string_longlat= `http://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key_location}`;
                                    console.log("api_string_long_lat "+api_string_longlat);
                                    res(api_string_longlat);
                                    })
                                })
        
        .then(api_string_longlat=>{
                fetch(api_string_longlat)
                .then(response => {
                    return response.json()
                }).then(data=>{
                        console.log(data)

                        console.log(data.name);
                        console.log(data.sys.country);
                        let api_key_forState="0391f70e8f4fae26893451187eaabc1e";
                        let apiString_state=`http://cors-anywhere.herokuapp.com/http://api.positionstack.com/v1/forward?access_key=${api_key_forState}&query=${data.name}`;
                        console.log(apiString_state);
                        fetch(apiString_state)
                        .then(data=>{
                            let temp=data.json();
                            console.log("temp"+temp);
                            return temp;
                                    })
                        .then(data=>{           
                            let [city,state]=[data.data[0].name,data.data[0].region];
                            
                            console.log("city "+city);
                            console.log("state "+state);
                            return [city,state];
                                })
                        .then(data=>{
                                    urlglobal=`http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/Everything?q=${data[0]} OR ${data[1]}&apikey=${api_key}`;
                                    fetchData(urlglobal)
                                    .then((resmsg)=>{
                                                        console.log(resmsg);
                                                        console.log(datanew);
                                                        card_headings[0].children[0].innerText=datanew.articles[0].title;
                                                        cards[0].children[0].src=datanew.articles[0].urlToImage;
                                                        headingPointer=0;
                                                        loadMore();
                            
                                                    })
                                    })
                        
                    
                    })
        })
        
}

    else{
        alert("unable to fetch your location");
    }
}

