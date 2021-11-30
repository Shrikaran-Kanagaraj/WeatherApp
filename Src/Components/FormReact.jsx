import { useState } from "react";
import {Form,Button, Card,FormControl } from 'react-bootstrap';
import axios from "axios";


export default function FormReact(){
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
        <div className="CardReport">
            <div>
                <Card border="info" style={ {width:'40rem'} }>
                    <Card.Header>Weather Report</Card.Header>
                        <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-5">
                                <Form.Label>Enter a City</Form.Label>
                                <FormControl type="text"
                                    placeholder="Enter City" 
                                    value={city}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Button onClick={handleSubmit} variant="outline-primary">Submit</Button>
                        </Form>
                        </Card.Body>
                </Card>                
            </div>
            <div>
                
                {
                    ( typeof weatherData!=='undefined' && weatherData.length > 0 )
                    ?
                    (
                        <div className="reportData">Temperature:{weatherData[0].main.temp}</div>
                    )
                    :
                    <div></div>
                }
                
            </div>
        </div>

        
                
    );
}