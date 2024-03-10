import React, { useState } from "react";
import { Container } from "react-bootstrap";
import countrydata from "../../citycountryData.json";

function CityCountryDropDown({setCountry, setCity}) {
  const [citiesList, setCities] = useState([]);

  const handlecountry = (e) => {
    const id = e.target.value - 1
    setCities(countrydata[id].cities)
    setCountry(countrydata[id].name)
  };

  const handleCity = (e) => {
    setCity(e.target.value)
  };
  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <form className="row g-3">
              <div className="col-md-3">
                <label className="form-label"> Country</label>
                <div className="text-dark">
                  <select
                    name="country"
                    className="form-control"
                    onChange={(e) => handlecountry(e)}
                  >
                    <option value="">--Select Country--</option>
                    {countrydata.map((country, id) => (
                      <option value={country.id} key={id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label"> City</label>
                <div className="text-dark">
                  <select
                    name="city"
                    className="form-control"
                    onChange={(e) => handleCity(e)}
                  >
                    <option value="">--Select City--</option>
                    {citiesList.map((city, id) => (
                      <option value={city.name} key={id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="col-md-2" style={{ padding: "9px" }}>
                <label className="form-label"> </label>
                <div className="text-dark">
                  <button name="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CityCountryDropDown;
