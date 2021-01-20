import React, { useState, useEffect, useRef } from "react";

function SearchLocationInput({setAddress, defaultValue}) {
  const [query, setQuery] = useState(defaultValue);
  const autoCompleteRef = useRef(null);
  let autoComplete;

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZRChI54_YSUb241Os5Hka8OeqqQ9A_VE&libraries=places`,
      () => handleScriptLoad()
    );
  }, []);

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
  
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }
  
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const handleScriptLoad = () => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"] }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect()
    );
  }
  
  const handlePlaceSelect = async () => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    setQuery(query);
    setAddress(query);
  }

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
        className="form-control"
      />
    </div>
  );
}

export default SearchLocationInput;