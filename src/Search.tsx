import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import server from "./global.tsx";

interface options {
  appid: number;
  name: string;
  value: string;
}

type StateChanger = [(data: any) => void, (app_id: any) => void];

function DebouncedSearchBar({ stateChanger }: { stateChanger: StateChanger }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useRef(searchTerm); // Use ref for debounced term
  const [options, setOptions] = useState<options[]>([]);

  const [setData, setApp_id] = stateChanger;

  const [prevInputs, setPrevInputs] = useState<string[]>([]); // Array to store prevInputs
  const [currDay, setCurrDay] = useState<string>("");

  useEffect(() => {
    fetch("https://shinjinsos.pythonanywhere.com/getDay", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => setCurrDay(data));

    let cacheInputs = localStorage.getItem("prevInputs");
    console.log("cacheInputs: " + cacheInputs);
    if (cacheInputs) {
      setPrevInputs(JSON.parse(cacheInputs));
    }
  }, []);

  useEffect(() => {
    if (currDay != localStorage.getItem("currDay")) {
      localStorage.setItem("prevInputs", JSON.stringify([]));
      localStorage.setItem("currDay", currDay);
      setPrevInputs([]);
    }
  }, [currDay]);

  useEffect(() => {
    localStorage.setItem("prevInputs", JSON.stringify(prevInputs));
    console.log("prevInputs updated: " + prevInputs);
  }, [prevInputs]);

  function handleGetRequest(pram: number) {
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
  const handleSearch = (searchTerm: string) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleGetRequest(options[0].appid);
    }

    if (event.key === "ArrowDown") {
      console.log("arrow down");
      if (options.length > 1) {
        document.getElementById("select")!.focus();
      }

      if (options.length == 1) {
        document.getElementById("select")!;
      }
    }
  };

  const handleSelect = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];

    if (event.key === "Enter") {
      handleGetRequest(parseInt(selectedOption.value));
    }
  };

  return (
    <>
      <div className="Parent">
        <input
          type="text"
          className="SearchBar rounded-xl text-xl f"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        {searchTerm && options.length > 1 ? (
          <select
            id="select"
            size={options.length < 5 ? options.length : 5}
            className="Dropdown rounded-xl f"
            onKeyDown={handleSelect}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.appid}
                onClick={() => handleGetRequest(option.appid)}
                className="text-center h-10 text-xl pt-2"
                //(event) => handleSelect(event, option.appid)}
              >
                {option.name}
              </option>
            ))}
          </select>
        ) : searchTerm && options.length == 1 ? (
          <option
            autoFocus
            id="select"
            className="Single text-center h-10 text-xl pt-2 rounded-xl"
            key={options[0].value}
            value={options[0].appid}
            onClick={() => handleGetRequest(options[0].appid)}
          >
            {options[0].name}
          </option>
        ) : null}
      </div>
    </>
  );
}

export default DebouncedSearchBar;
