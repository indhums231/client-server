import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const defaultSearches = [
  "pizza", "burger", "cookies", "juice", "biriyani", "salad", "ice cream", "lasagna", "pudding", "soup"
];

export default function PreviousSearches({ recipes, setFilteredRecipes }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("previousSearches"));
    if (storedSearches && storedSearches.length > 0) {
      setPreviousSearches(storedSearches);
    } else {
      setPreviousSearches(defaultSearches);
      localStorage.setItem("previousSearches", JSON.stringify(defaultSearches));
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredRecipes(recipes);
    }
  };

  const handleSearchIconClick = () => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);

      if (!previousSearches.includes(query)) {
        const updatedSearches = [query, ...previousSearches];
        setPreviousSearches(updatedSearches);
        localStorage.setItem("previousSearches", JSON.stringify(updatedSearches));
      }
    }
  };

  const handleRemoveSearch = (searchToRemove) => {
    const updatedSearches = previousSearches.filter(search => search !== searchToRemove);
    setPreviousSearches(updatedSearches);
    localStorage.setItem("previousSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="previous-searches-section">
      <h2>Previous Searches</h2>
      <div className="previous-searches-container">
        {previousSearches.length > 0 ? (
          previousSearches.map((search, index) => (
            <div key={index} className="search-item">
              {search}
              <FontAwesomeIcon
                icon={faTimes}
                className="remove-search-icon"
                onClick={() => handleRemoveSearch(search)}
              />
            </div>
          ))
        ) : (
          <p>No previous searches found.</p>
        )}
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn" onClick={handleSearchIconClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
