import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather'
import './weather.css'

function Weather(){

    const [form,setForm] =useState({
        city:"",
        country:""
    })
    const [weather,setWeather] = useState([])
    const handleChange = (e)=>{
     let name =e.target.name;
     let value = e.target.value;
     
     if(name=="city"){
         setForm({ ...form,city:value})
     }
     if(name=="country"){
        setForm({ ...form,country:value})
    }   
    }
    const APIKEY = "858f15fed9292cbe25c341a754c55e45";

    async function getWeatherData(e){
        e.preventDefault();
        if(form.city == ""){
            alert("Search for City");
        } else{
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIKEY}`
            )
            .then((res)=> res.json())
            .then((data)=>data);
            setWeather({data:data});
        }
    }
    return(
        <div className="weather">
            <span className="title">Weather Data App</span>
            <br />
            <form>
                <input type="text" name="city" placeholder="Enter city name" onChange={(e) => handleChange(e)}/>
                <button className = "weatherbutton" onClick={(e)=>getWeatherData(e)}>Get Weather Details</button>                
                {weather.data!= undefined ?
                (<div>
                    <DisplayWeather data={weather.data} /></div> ):null}
            </form>
        </div>
    )
}

export default Weather;