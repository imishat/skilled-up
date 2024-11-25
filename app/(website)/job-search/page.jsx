"use client";

import { Button } from "@/app/components/ui/button";
import { getAllCategories } from "@/app/lib/jobCategories";
import { getSearchedJobSeekers } from "@/app/lib/search";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdvanceFilter from "./components/AdvanceFilter";
import SearchResult from "./components/SearchResult";

export default function JobSearch() {
  // Local State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState({
    totalResults: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    currentItems: 0,
  });

  // Hooks
  const searchParams = useSearchParams();

  // Query Params

  /**
   * HANDLERS
   */
  const getAllJobCategories = async () => {
    setIsLoading(true);
    const res = await getAllCategories();
    let categoryOptions = res?.map(category => ({
      value: category.id,
      label: category.name,
    }));

    categoryOptions = [{ value: null, label: "All" }, ...categoryOptions];
    setCategories(categoryOptions);
    setIsLoading(false);
  };

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    // handleGetAllJobSeekers(category, keyword);
  };

  const handleKeywordSearchSubmit = e => {
    e.preventDefault();
    handleGetAllJobSeekers(selectedCategory, keyword);
  };

  const resetFilters = () => {
    setSelectedOption(null);
    setKeyword("");
    setStatus("all");
  };

  const handleGetAllJobSeekers = async (category, keyword, page, limit) => {
    setIsLoading(true);
    const res = await getSearchedJobSeekers(
      category,
      keyword,
      null,
      page,
      limit
    );
    setJobSeekers(res?.searchResult?.results);
    setMeta({
      totalResults: res?.searchResult?.totalResults,
      page: res?.searchResult?.page,
      limit: res?.searchResult?.limit,
      totalPages: res?.searchResult?.totalPages,
      currentItems: res?.searchResult?.currentItemsCount,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllJobCategories();
  }, []);

  useEffect(() => {
    handleGetAllJobSeekers(selectedCategory, keyword, page, limit);
  }, [selectedCategory, keyword, page, limit]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setKeyword(category);
    }
  }, [searchParams]);

  return (
    <div className="mt-20 text-white container">
      <div className="text-center flex flex-col items-center justify-center h-auto md:h-64">
        <h1 className="text-3xl font-semibold mb-4">Jobs Available Now</h1>
        <div>
          <form
            onSubmit={handleKeywordSearchSubmit}
            className="flex gap-2  flex-col md:flex-row items-center justify-center md:bg-white rounded-md px-2 mt-10 text-black/75"
          >
            <input
              type="text"
              className="border-none w-full bg-white md:bg-transparent py-3.5 px-5 rounded focus:outline-none text-black"
              placeholder="Your Keyword..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <Button type="submit" customClass="ml-auto md:ml-0">
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AdvanceFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleSelectCategory}
        />
        <SearchResult
          jobSeekers={jobSeekers}
          metaData={meta}
          setPage={setPage}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
