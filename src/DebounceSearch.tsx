import React, { useState } from "react";

import { debounce } from "lodash";

function SearchComponent() {
  const debouncedSearch = debounce((searchTerm) => {
    // Make API call here
    fetch(`/api/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Update suggestions based on API response
        setSuggestions(data);
      });
  }, 300); // Delay in milliseconds

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
}
