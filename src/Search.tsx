import React, { useState, useEffect, useRef } from "react";

function DebouncedSearchBar({ stateChanger }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useRef(searchTerm); // Use ref for debounced term
  const [options, setOptions] = useState(["a", "b", "c", "d", "e"]);

  const [setData, setApp_id] = stateChanger;

  useEffect(() => {
    console.log("options updated: " + options);
  }, [options]);

  //handles when a game is clicked
  function handleGetRequest(pram) {
    console.log("fetching game with id: " + pram);
    setApp_id(pram);
    fetch("http://127.0.0.1:5000/get_game/" + pram.toString(), {
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
    console.log("Searching for:", searchTerm);
    fetch("http://127.0.0.1:5000/search/" + searchTerm, {
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
      console.log(
        "pressed enter: looking for " +
          options[0].name +
          " with id " +
          options[0].appid
      );

      handleGetRequest(options[0].appid);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/* /* <input
        className="SearchBar"
        value={inputValue}
        onKeyDown={handleClick}
        onChange={handleChange}
      /> */}
      <select
        size={options.length < 5 ? options.length : 5}
        className="Dropdown"
        autoFocus
        // onChange={(event) => handleGetRequest(event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.appid}
            onClick={(event) => handleGetRequest(option.appid)}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default DebouncedSearchBar;
