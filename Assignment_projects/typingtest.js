let quoteDisplay=document.getElementsByClassName("quoteDisplay")
let quoteInput=document.getElementsByClassName("quoteInput")
let displayed_content=document.getElementsByClassName("matter")
let timer=document.getElementsByClassName("timer")
const url="https://api.quotable.io/random";
let charSpan;
let finalstring;
fetch(url).then(matter =>
    {
        return matter.json()
    }).then(content =>{
            finalstring=content.content
            finalstring.split("").forEach(element => {
            charSpan=document.createElement("span");
            charSpan.innerHTML=element
            charSpan.classList.add("matter")
            quoteDisplay[0].appendChild(charSpan)

            // displayed_content[0].style.backgroundColor="#fff";
            displayed_content[0].classList.add("blink");
        
        })
    })

let display_len
var cursor_point=0;
let input_len
let inputString;




quoteInput[0].addEventListener("input",(event)=>
{   
    inputString=quoteInput[0].value
    input_len=inputString.length
    console.log(displayed_content)
      
    if(input_len==finalstring.length)
    {
        location.reload()
    }
    // displayed_content[input_len].style.backgroundColor="#fff"
    // displayed_content[input_len-1].style.backgroundColor="yellow";
    
    if(keecode!=8)
    {console.log("8 not there")
     displayed_content[input_len].classList.add("blink")
     displayed_content[input_len-1].classList.remove("blink")
     displayed_content[input_len-1].classList.remove("blink")
    }
    else
    {
        displayed_content[input_len+1].classList.remove("blink")
        displayed_content[input_len].classList.add("blink")
        keecode=0
        
    }

    for(let i=0;i<input_len;i++)
    {
        if(inputString[i]==finalstring[i])
        {
            displayed_content[i].style.color="yellowgreen"
        }        
        else
        displayed_content[i].style.color="red"
    }
      
})

let keecode=0;
quoteInput[0].addEventListener("keydown",(event) =>{
    if(event.keyCode==8)
    {
        keecode=8;
    }
})

function timerfunc()
{   let startTime=new Date()
   setInterval(()=> {getTime(startTime)},1000)


}

function getTime(startTime)
{
    timer[0].innerText=Math.floor((new Date()-startTime)/1000)
}

timerfunc()