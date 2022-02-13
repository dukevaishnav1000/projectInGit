let lists = document.querySelectorAll('.list');
let list_item=document.querySelectorAll('.list-item');

let dragged_item=null;


list_item.forEach(function (item) {
    item.addEventListener("dragstart",()=>
    {   console.log("dragstart")
        dragged_item=item;
        console.log("value of dragged_item "+dragged_item)
        setTimeout(function(){
            item.style.display="none";         
        },0)
               
    })

    item.addEventListener("dragend",function(){
            console.log("dragend")
            setTimeout(function(){
            dragged_item.style.display="block";
            dragged_item=null;
        },0)
    })
})


 lists.forEach(function(item){

    item.addEventListener("dragover",function(e){
        console.log("dragover");
        e.preventDefault();
    })

    item.addEventListener("dragenter",function(e){
        console.log("dragenter");
        e.preventDefault();
    })

    item.addEventListener("drop",function(){
        console.log("drop called")
        this.append(dragged_item)
    })

 })
    


    // item.addEventListener("dragend",function(){
        
    // item.style.display="block";
