import React, { useState, useEffect, useRef } from "react";
import "./Search.css";

function DebouncedSearchBar({ stateChanger }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useRef(searchTerm); // Use ref for debounced term
  const [options, setOptions] = useState([]);

  const [setData, setApp_id] = stateChanger;

  const [prevInputs, setPrevInputs] = useState([]); // Array to store prevInputs

  // useEffect(() => {
  //   console.log("options updated: " + options);
  // }, [options]);

  //handles when a game is clicked

  const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";
  function handleGetRequest(pram) {
    //console.log("fetching game with id: " + pram);
    // console.log("prevInputs: " + prevInputs);
    // console.log("pram: " + pram);

    for (const key in prevInputs) {
      //console.log(`${key}: ${prevInputs[key]}`);
      if (prevInputs[key] === pram.toString()) {
        console.log("already in prevInputs");
        setSearchTerm("");
        setOptions([]);
        return null;
      }
    }

    setPrevInputs([...prevInputs, pram.toString()]);

    setApp_id(pram);
    fetch(server + "/get_game/" + pram.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setData(data));

    setSearchTerm("");
    setOptions([]);
  }

  //handles typing in the search bar
  const handleSearch = (searchTerm) => {
    // Perform search logic here, e.g., filter data
    // console.log("Searching for:", searchTerm);
    fetch(server + "/search/" + searchTerm, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((options) => setOptions(options));
  };

  useEffect(() => {
    // Set up the timeout
    const timeoutId = setTimeout(() => {
      debouncedSearchTerm.current = searchTerm; // Update the ref with current term
      handleSearch(searchTerm); // Call the onSearch function with the debounced term
    }, 500); // Debounce time in milliseconds (500ms = 0.5 seconds)

    // Clear the previous timeout if the search term changes
    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // Add onSearch to the dependency array

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGetRequest(options[0].appid);
    }
  };

  return (
    <>
      <div className="Parent">
        <input
          type="text"
          className="SearchBar rounded-xl text-xl"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        {searchTerm && options.length > 1 ? (
          <select
            size={options.length < 5 ? options.length : 5}
            className="Dropdown rounded-xl"
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.appid}
                onClick={(event) => handleGetRequest(option.appid)}
                className="text-center h-10 text-xl pt-2"
              >
                {option.name}
              </option>
            ))}
          </select>
        ) : searchTerm && options.length == 1 ? (
          <option
            className="Single text-center h-10 text-xl pt-2 rounded-xl"
            key={options[0].value}
            value={options[0].appid}
            onClick={(event) => handleGetRequest(options[0].appid)}
          >
            {options[0].name}
          </option>
        ) : null}
      </div>
    </>
  );
}

export default DebouncedSearchBar;
