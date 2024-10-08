import { CiSearch } from "react-icons/ci";
import { memo } from "react";
interface SearchBarProps {
  searchText: string;
  className:string;
  setSearchText: (arg: any) => void;
}
const SearchBar= memo(({ className, searchText, setSearchText }: SearchBarProps) => {

  return (
    <form className={""+" "+className}>
      <div className="relative">
          <div className="absolute left-0 h-full w-max flex items-center pointer-events-none">
            <CiSearch className="h-7 w-7 pl-3"/>
          </div>
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 bg-gray-600 h-full p-2 rounded-md border-cyan-950 focus:outline-gray-400 "
          placeholder="Search ...."
        />
      </div>
    </form>
  );
})

export default SearchBar;