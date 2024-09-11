import { CiSearch } from "react-icons/ci";

interface props {
  searchText: string | undefined;
  setSearchText: (arg: any) => void;
}
export default function SearchBar({ searchText, setSearchText }: props) {
  return (
    <form className="w-full h-max p-4">
      {/* <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CiSearch />
        </div>
        <input
          type="search"
          id="default-search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="block w-full h-full p-4 ps-10 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
        />
      </div>
    </form>
  );
}
