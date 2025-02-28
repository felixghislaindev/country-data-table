import React, { useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import {
  currentPageState,
  entriesPerPageState,
  selectedValueState,
  selectedContinentState,
  selectedCurrencyState,
  countryCodeState,
} from "./atoms";
import CountryTable from "./components/CountryTable";
import PaginationControls from "./components/PaginationControls";
import RadioButton from "./components/RadioButton";
import { Input as SearchBar } from "./components/Input";
import SelectDropdown from "./components/SelectDropdown";
import { GET_COUNTRIES } from "./queries/countriesQuery";
import { Country } from "./types";
import usePageParams from "./hooks/usePageParams";
import usePageReset from "./hooks/usePageReset";

function App() {
  // Use Recoil for global state
  const [countryCode, setCountryCode] = useRecoilState(countryCodeState);

  const [selectedValue, setSelectedValue] = useRecoilState(selectedValueState);
  const [selectedContinent, setSelectedContinent] = useRecoilState(
    selectedContinentState
  );
  const [selectedCurrency, setSelectedCurrency] = useRecoilState(
    selectedCurrencyState
  );
  // pagination
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [entriesPerPage, setEntriesPerPage] =
    useRecoilState(entriesPerPageState);

  // fetching countries
  const { loading, error, data, refetch } = useQuery(GET_COUNTRIES, {
    variables: {
      skip: (currentPage - 1) * entriesPerPage,
      limit: entriesPerPage,
    },
  });

  usePageParams(currentPage, entriesPerPage);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const handleEntriesPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEntriesPerPage(Number(e.target.value));
      setCurrentPage(1);
    },
    [setEntriesPerPage, setCurrentPage]
  );

  const countries: Country[] = data?.countries || [];

  // Filters
  const filteredCountries = useMemo(() => {
    return selectedContinent
      ? countries.filter((c) => c.continent.name === selectedContinent)
      : countries;
  }, [countries, selectedContinent]);

  const filteredByCurrency = useMemo(() => {
    return selectedCurrency
      ? filteredCountries.filter((c) => c.currency === selectedCurrency)
      : filteredCountries;
  }, [filteredCountries, selectedCurrency]);

  const filteredBySearch = useMemo(() => {
    return countryCode
      ? filteredByCurrency.filter(
          (c) =>
            c.code.toLowerCase() === countryCode.toLowerCase() ||
            c.name.toLowerCase().includes(countryCode.toLowerCase())
        )
      : filteredByCurrency;
  }, [filteredByCurrency, countryCode]);

  const generatePageNumbers = (
    validTotalPages: number,
    maxPagesToShow: number,
    currentPage: number
  ): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];

    if (validTotalPages <= maxPagesToShow) {
      // just show all page numbers if the total pages are less than or equal to the max pages to show.
      for (let i = 1; i <= validTotalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first 5 pages and then ellipses
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }

      // Add ellipses if currentPage is not near the end
      if (currentPage < validTotalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(validTotalPages);
    }

    return pageNumbers;
  };

  const totalPages = useMemo(() => {
    return Math.ceil(filteredBySearch.length / entriesPerPage);
  }, [filteredBySearch.length, entriesPerPage]);
  const validTotalPages = totalPages > 0 ? totalPages : 1;

  const maxPagesToShow = 5; // number of pages to show ellipsis
  const pageNumbers = useMemo(() => {
    return generatePageNumbers(validTotalPages, maxPagesToShow, currentPage);
  }, [validTotalPages, maxPagesToShow, currentPage]);

  // handle page reset when the currentPage exceeds validTotalPages
  usePageReset(currentPage, validTotalPages, setCurrentPage);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <h3>Error fetching countries.</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Country Finder</h1>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Refresh
        </button>
      </div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Select Search Type</p>
        <div className="flex flex-col space-y-2 mb-4">
          <RadioButton
            id="continent-currency"
            value="continent-currency"
            label="Search by Continent and Currency"
            name="searchType"
            checked={selectedValue === "continent-currency"}
            onChange={setSelectedValue}
          />
          <RadioButton
            id="country-code"
            value="country-code"
            label="Search by Country Code & Name"
            name="searchType"
            checked={selectedValue === "country-code"}
            onChange={setSelectedValue}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {selectedValue === "continent-currency" ? (
              <>
                <SelectDropdown
                  options={[
                    { value: "", label: "All Continents" },
                    ...[...new Set(countries.map((c) => c.continent.name))]
                      .sort()
                      .map((c) => ({ value: c, label: c })),
                  ]}
                  placeholder="Select Continent"
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                />
                <SelectDropdown
                  options={[
                    { value: "", label: "All Currencies" },
                    ...[
                      ...new Set(
                        filteredCountries.map((c) => c.currency).filter(Boolean)
                      ),
                    ]
                      .sort()
                      .map((cur) => ({
                        value: cur,
                        label: cur,
                      })),
                  ]}
                  placeholder="Select Currency"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                />
              </>
            ) : (
              <SearchBar
                placeholder="Enter Country Code & Name"
                id={`select-country-code${countryCode}`}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            )}
          </div>
          <div className="mt-6">
            <SelectDropdown
              options={[
                { value: "10", label: "10 entries" },
                { value: "20", label: "20 entries" },
                { value: "50", label: "50 entries" },
                { value: "100", label: "100 entries" },
              ]}
              placeholder="Select Entries Per Page"
              value={entriesPerPage.toString()}
              onChange={handleEntriesPerPageChange}
            />
          </div>
        </div>
      </div>
      {/* Display Total Number of Entries */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Entries:{" "}
          <span className="font-bold">{filteredBySearch.length}</span>
        </p>
      </div>
      <CountryTable
        data={filteredBySearch.slice(
          (currentPage - 1) * entriesPerPage,
          currentPage * entriesPerPage
        )}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={validTotalPages}
        setCurrentPage={handlePageChange}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}

export default App;
