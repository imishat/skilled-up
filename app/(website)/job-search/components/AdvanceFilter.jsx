import SubHeader from "../../components/Subheader/Subheader";

export default function AdvanceFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="px-5 w-full lg:w-[370px]">
      <div className="flex justify-between items-center border-b border-b-white/75 mb-5">
        <SubHeader className="mb-2">Advance Filter</SubHeader>
        <div className="text-white/70 cursor-pointer -mb-3">Reset</div>
      </div>
      <div>
        <div>
          {/* <h3 className="text-3xl font-semibold">Industry</h3> */}
          <SubHeader>Categories</SubHeader>
          <div className="flex flex-col gap-3">
            {categories?.map((category, index) => (
              <label
                key={index}
                htmlFor={category.label}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  id={category.label}
                  name={category.label}
                  className="w-6 h-6"
                  checked={selectedCategory === category.value ? true : false}
                  onChange={e => {
                    onCategoryChange(category.value);
                  }}
                />
                <div className="flex items-center justify-between w-full">
                  <span>{category.label}</span>
                  <span>{category.availableJob}</span>
                </div>
              </label>
            ))}
          
          </div>
        </div>
      </div>
    </div>
  );
}
