import { CiSearch } from "react-icons/ci";
import React, { memo, useState, Children, useRef } from "react";
interface SearchBarProps {
  className?:string,
  children?:React.ReactNode
}
const SearchBar= memo(({ className="", children}: SearchBarProps) => {
  const [searchText,setSearchText] = useState('');
  const containerRef =  useRef(null)

  return (
    <div ref ={containerRef} className={`${className}`}>
      <form className="p-2">
        <div className="relative">
            <div className="absolute left-0 h-full w-max flex items-center pointer-events-none">
              <CiSearch className="h-7 w-7 pl-3"/>
            </div>
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10  h-full p-2 rounded-md  focus:outline-gray-400"
            placeholder="Search ...."
          />
        </div>
      </form>
      {
        Children.map(children, child=>{
          return React.cloneElement(child as JSX.Element, {searchText:searchText, containerRef:containerRef})
        }) 
      }

    </div>
  );
})

export default SearchBar;