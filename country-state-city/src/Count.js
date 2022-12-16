import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function Count() {
    const [countres, setCountres] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [showDiv, setShowDiv] = useState(false);

    const [isoCode, setIsoCode] = useState("");

    useEffect(() => {
        getcountry();
    }, []);

    const getcountry = async () => {
        const req = await fetch("http://localhost:8000/api/v1/getAllCountry");
        const getcountry = await req.json();
        // console.log(getcountry);
        setCountres(getcountry.data);
    };

    const handleCountry = (event) => {
        const getisoCode = event.target.value;
        // console.log("event", event.target.value);
        setSelectedCountry(event.target.value);
        let countryCode = event.target.value;
        getstate(countryCode);
        // console.log(getisoCode);
        setIsoCode(getisoCode);
        event.preventDefault();
    };
    const getstate = async (countryCode) => {
        let stateData = {
            countryCode,
        };
        axios
            .post("http://localhost:8000/api/v1/getStateFromCountry", stateData)
            .then((res) => {
                console.log("response", res.data);
                setState(res.data.data);
            });
    };

    const handleState = (event) => {
        setSelectedState(event.target.value);
        let stateCode = event.target.value;
        getcity(stateCode);
    };
    const getcity = async (stateCode) => {
        let cityData = {
            countryCode: selectedCountry,
            stateCode: stateCode,
        };
        axios
            .post("http://localhost:8000/api/v1/getCitiesFromStateCode", cityData)
            .then((res) => {
                // console.log("response", res.data);
                setCity(res.data.data);
            });
    };

    const handleCity = (event) => {
        setSelectedCity(event.target.value);
    };

    // const onSubmit = () => {};

    return (
        <div>
            <div className="main">
                <div className="country-class">
                    <label>Country</label>
                    <select name="country" onChange={(e) => handleCountry(e)}>
                        <option>----select Country----</option>
                        {countres.map((getcon, index) => (
                            <option key={index} value={getcon.isoCode}>
                                {getcon.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="state-class">
                    <label>State</label>
                    <select name="state" onChange={(e) => handleState(e)}>
                        <option>----select State----</option>
                        {state.map((resst, index) => (
                            <option key={index} value={resst.isoCode}>
                                {resst.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="city-class">
                    <label>City</label>
                    <select name="state" onChange={(e) => handleCity(e)}>
                        <option>----select city----</option>
                        {city.map((recity, index) => (
                            <option key={index} value={recity.isoCode}>
                                {recity.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="button">
                    <button type="submit" onClick={() => setShowDiv(!showDiv)}>
                        Submit
                    </button>
                </div>
            </div>

            {
                showDiv && (
                    // {selectedCountry !== "" && selectedState !== "" && selectedCity !== "" ? (
                    <>
                        <div className="display">
                            <h2>Country Name : {selectedCountry}</h2>
                            <h2>State Name : {selectedState}</h2>
                            <h2>City Name : {selectedCity}</h2>
                        </div>
                    </>
                )
            }
        </div>
    );
}
export default Count;
