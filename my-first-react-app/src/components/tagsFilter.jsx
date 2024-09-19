export default function TagsFilter({tags, handleFilterButtonClick, selectedFilters}){
    return(
      <>
      {tags?.map((tag, idx) => (
         <button className={`my-4 text-xs inline-flex items-center font-bold leading-sm px-5 py-2 bg-green-200 text-black-700 rounded-full hover:shadow-lg ${
          selectedFilters?.includes(tag.name) ? "bg-orange-400" : ""}`} onClick={() => handleFilterButtonClick(tag.name)} key={`filters-${idx}`}>
          {tag.name}
         </button>
      ))}
      </>
  
    );
}
  