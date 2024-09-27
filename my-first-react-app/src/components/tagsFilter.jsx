export default function TagsFilter({tags, handleFilterButtonClick, selectedFilters}){
    return(
      <div className="flex flex-col items-start">
        {tags?.sort((a, b) => b.num - a.num).map((tag, idx) => (
          <button className={`my-4 text-sm font-bold leading-sm px-5 py-2 bg-blue-200 text-black-700 rounded-full hover:shadow-lg ${
            selectedFilters?.includes(tag.name) ? "bg-orange-400" : ""} ${
              tag.num >= 8 ? 'text-2xl' :
              tag.num >= 6 ? 'text-xl' :
              tag.num >= 4 ? 'text-lg' :
              tag.num >= 2 ? 'text-base' :
              'text-sm'
            }`} onClick={() => handleFilterButtonClick(tag.name)} key={`filters-${idx}`}>
            {tag.name}
          </button>
        ))}
      </div>
  
    );
}
  