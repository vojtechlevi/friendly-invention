import React from 'react'

const SearchBar = ({ setQuery }) => {

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.elements.search.value);
    };
    return (
        <header className="p-4 w-[500px] mx-auto bg-white shadow-md rounded-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="flex-grow p-2 border rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </form>
        </header>
    )
}

export default SearchBar