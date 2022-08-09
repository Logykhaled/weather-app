


/* Global Variables */
const go = document.querySelector("button");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const content = document.querySelector("#content");
const temp =document.querySelector("#temp");
const city =document.querySelector("#city");

// Create a new date instance dynamically with JS.
let d = new Date();
let newDate = d.toDateString();
//base url to receive weather information from the web API.
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// personal API key  and i use &units=imperial 
const apiKey ="&appid=604640b7ad566b14f766d56969dc9f4c&units=imperial";
// the url of the  local server to post data
 const myServer ="http://127.0.0.1:8000";



 //whan the user click on the button the functions in the event listener run
 go.addEventListener("click",(evt)=>{
    evt.preventDefault();
    const myUrl=`${baseURL}${zip.value}${apiKey}`;
  getData(myUrl)
  .then((data)=>{
        selectData(data)
    .then((info)=>{
            postData("/add",info)
        .then(()=>{
            retrieveData("/all")
   })      


    })
  });
 });
// to get the weather data by the web API
 const getData= async (url)=>{
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.cod==200){
            
            return data;
        }else{
            console.log(data.message);
            alert(data.message);
        }
       
    }
    
    catch(error){
        console.log(error);
    }
 };
// to get the info we need from the json array
 const selectData = async (data)=>{
    try{
        info={
            newDate,
            city: data.name,
            feelings: feelings.value,
            temp: data.main.temp
        }
        
        return info;
       
    }


    catch(error){console.log(error);}
 };
//function to store data in local server
 const postData =  async(url="",info={})=>{
    try{
        const res = await fetch (url,{
            method:"POST",
            credentials:"same-origin",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(info),
        });
        return res;
    }
    catch(error){console.log(error);}
};
//to update UI
    const retrieveData= async (url)=>{
    const res = await fetch(url);
        try{
        const saveData = await res.json();
        document.getElementById("date").innerHTML=saveData.newDate;
        document.getElementById("temp").innerHTML=saveData.temp ;
        document.getElementById("content").innerHTML=saveData.feelings;
        document.getElementById("city").innerHTML=saveData.city;
        console.log(saveData)
    }
        catch(error){
            console.log(error);
        }
   
};
