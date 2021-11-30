import { useState } from "react";
import axios from "axios";


export default function Form(){

    const [city,setCity] = useState("");
    const [weatherData,setWeatherData] = useState([]);


    const handleChange=(event)=>{
        setCity(event.target.value);
    }

    const handleSubmit=(event)=>{
        console.log(city);
        event.preventDefault();
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f33a484cf794d08d0148764789aaba32`)
        .then((Response)=>{
            console.log("ApiData:", Response.data);
            setWeatherData([Response.data]);
        })
        setCity("");
    }


    return(

        <div>
            <h2>Weather Report</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        City: 
                        <input id="city"
                            value={city}
                            type="text"
                            placeholder="Enter City"
                            onChange={handleChange}
                        />
                    </label>

                    <button 
                        type="submit">
                        Get Details
                    </button>
                
                </form>
            </div>
            <div>
                {
                    ( typeof weatherData!=='undefined' && weatherData.length > 0 )
                    ?
                    (
                        <div>Temperature:{weatherData[0].main.temp}</div>
                    )
                    :
                    <></>
                } 
            </div>
        </div>
    );

}
