import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DropdownReact = () => {
    const [countres, setCountres] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [showDiv, setShowDiv] = useState(false);

    console.log("selectedState", {
        selectedCountry,
        selectedState,
        selectedCity,
    });


    useEffect(() => {
        getcountry();
    }, []);

    const getcountry = async () => {
        const req = await fetch("http://localhost:8000/api/v1/getAllCountry");
        const getcountry = await req.json();
        setCountres(getcountry.data);
    };

    const handleCountry = (event) => {
        setSelectedCountry(event);
        let countryCode = event.value;
        getstate(countryCode);
    };
    const getstate = async (countryCode) => {
        let stateData = {
            countryCode,
        };
        axios
            .post("http://localhost:8000/api/v1/getStateFromCountry", stateData)
            .then((res) => {
                setState(res.data.data);
            });
    };

    const handleState = (event) => {
        setSelectedState(event);
        let stateCode = event.value;
        getcity(stateCode);
    };

    const getcity = async (stateCode) => {
        let cityData = {
            countryCode: selectedCountry.value,
            stateCode: stateCode,
        };

        console.log("cityData body data", cityData);
        axios
            .post("http://localhost:8000/api/v1/getCitiesFromStateCode", cityData)
            .then((res) => {
                setCity(res.data.data);
            });
    };

    const handleCity = (event) => {
        setSelectedCity(event);
    };

    return (
        <div>
            <Select
                // defaultValue={selectedCountry}
                onChange={handleCountry}
                options={countres.map((data) => ({
                    value: data.isoCode,
                    label: data.name,
                }))}
            />

            <Select
                // defaultValue={selectedCountry}
                onChange={handleState}
                options={state.map((dataState) => ({
                    value: dataState.isoCode,
                    label: dataState.name,
                }))}
            />

            <Select
                // defaultValue={selectedCountry}
                onChange={handleCity}
                options={city.map((dataCity) => ({
                    value: dataCity.countryCode,
                    label: dataCity.name,
                }))}
            />

            <div className="button">
                <button type="submit" onClick={() => setShowDiv(!showDiv)}>
                    Submit
                </button>
            </div>

            {showDiv && (
                // {selectedCountry !== "" && selectedState !== "" && selectedCity !== "" ? (
                <>
                    <div className="display">
                        <h2>Country Name : {selectedCountry.label}</h2>
                        <h2>State Name : {selectedState.label}</h2>
                        <h2>City Name : {selectedCity.label}</h2>
                    </div>
                </>
            )}
        </div>
    );
};

export default DropdownReact;
