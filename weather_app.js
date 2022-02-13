let long;
let lat;
let timezone=document.querySelectorAll(".timezone")
let tempValue=document.querySelectorAll(".tempValue")
let temp_descript=document.querySelectorAll(".description")
let temp=document.querySelector(".temperature")
let unit=document.getElementById("unit")
let Cvalue;
let Fvalue;
let weather_image;
let image=document.querySelector(".location p")
window.addEventListener("load",() => {
 
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
            {   console.log(timezone)
                console.log(tempValue)
                console.log(data)
                timezone[0].textContent=data.name+","+data.sys.country;
                temp_descript[0].textContent=data.weather[0].description;
                tempValue[0].textContent=Math.floor(parseInt(data.main.temp)-273.15).toPrecision(3);
                Cvalue=tempValue[0].textContent;
                Fvalue=(parseInt(Cvalue)*9/5+32).toPrecision(3);
                console.log(image)
                weather_image="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";

                image.style.backgroundImage=`url(${weather_image})`;
                
            })
    })   
    }
    else(
        h1.textContent="location not accessbile"
    )
})

temp.addEventListener("click",() =>{

        console.log(unit.innerHTML)
        console.log(tempValue[0].textContent)
    
    if(unit.innerHTML=="C")
    {   
        unit.innerHTML="F"
        tempValue[0].textContent=Fvalue;
    }
    else
    {unit.innerHTML="C";
    tempValue[0].textContent=Cvalue;
    }          
})


