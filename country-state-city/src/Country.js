import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Country() {
    const [countres, setCountres] = useState([]);
    // const [getcountryid, setGetcountryid] = useState('')
    const [isoCode, setIsoCode] = useState('')
    const [selectedcountry, setselectedcountry] = useState('')
    const [st, setSt] = useState([]);


    useEffect(() => {
        getcountry();

    }, [isoCode]);


    // const getcountry = () => {
    //     axios.get("http://localhost:8000/api/v1/getAllCountry").then((res) => {
    //         console.log(res)
    //         const coun = setCountres(res.data.data);
    //         console.log(coun);
    //     });
    // }

    const getcountry = () => {

        axios.get(`http://localhost:8000/api/v1/getAllCountry/${isoCode}`).then((res) => {

            // console.log(res)
            setCountres(res.data.data);
            // const coun = setCountres(res.data.data);
            // console.log(res.data.data);

        });
        // console.log(`Countrydata`, e);
        // console.log(`e.target`, e.target.value);
    };

    const handlecountry = (event) => {
        const getisoCode = event.target.value;
        setIsoCode(getisoCode);
        // console.log(setIsoCode)
        event.preventDefault();
    }

    // const handlechange = (event
    // ) => {

    //     alert("dddjdj");
    //     // const id = data._countryCode;
    //     // const bodyData = {
    //     //     countryCode: id,
    //     // };
    //     // alert('ok')
    //     // axios
    //     // .post("http://localhost:8000/api/v1/getStateFromCountry", bodyData)
    //     axios.post(`http://localhost:8000/api/v1/getStateFromCountry`,
    //         { 'countryCode': event.target.value }).then((res) =>
    //             console.log("res", res));
    // }

    // .then((res) => {
    //     if (res.data.success === 1) {
    //         let setData = res.data && res.data.data;
    //         console.log(setData)
    //         setSt(setData);
    //     }
    // });


    // const getst = response.json();
    // console.log(response);
    // setSt(getst)

    // const isoCode = event.target.value;
    // console.log(isoCode)
    // setIsoCode(isoCode)

    return (
        <div>
            <div className='main'>
                <div className='country-class'>
                    <label>Country</label>
                    <select name='country' onChange={(e) => handlecountry(e)}>

                        <option>----select Country----</option>
                        {
                            countres.map((getcon) => (
                                <option
                                    key={getcon.isoCode}
                                    value={getcon.isoCode}

                                // onChange={(e) => handleCountry(e.target.value)}
                                >{getcon.name}</option>
                            ))
                        }

                    </select>

                </div>
                <div className='state-class'>
                    <label>State</label>
                    <select name='state'>
                        <option>----select State----</option>
                        {
                            st.map((resst) => (
                                <option key={resst.id}>{resst.name}</option>
                            ))
                        }

                    </select>
                </div>
                <div className='state-class'>
                    <label>City</label>
                    <select name='state'>
                        <option>----select city----</option>


                    </select>
                </div>
                <div className='button'>
                    <button type='submit'>Submit</button>
                </div>

            </div>
            <div className='display'>
                {/* <h2>CountryName:{setCountres(this.target.value)}</h2> */}
            </div>
        </div>

    )
}
export default Country;