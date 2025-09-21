import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const SearchRestaurants = ({ searchQuery, setSearchQuery, setSort }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <div className="flex">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen((prev) => !prev);
          }}
          className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200"
          type="button"
        >
          Sort <BsChevronDown className="ml-2 font-bold" />
        </button>

        {isDropdownOpen && (
          <div
            id="dropdown"
            className="absolute mt-12 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm"
          >
            <ul className="py-2 text-sm font-medium  text-gray-700">
              {["name", "orders"].map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 capitalize hover:bg-gray-100"
                    onClick={() => {
                      setSort(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative w-full">
          <input
            type="search"
            className="z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Search Restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute end-0 top-0 h-full rounded-e-lg border border-red-700 bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
          >
            <FaSearch />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchRestaurants;