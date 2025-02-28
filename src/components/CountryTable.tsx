import React from "react";
import { Country } from "../types";

interface CountryTableProps {
  data: Country[];
}

const tableCellClass = "py-3 px-6 border-b border-gray-400";
const tableRowClass = "py-3 px-6 text-left border-b border-gray-300";

const CountryRow: React.FC<{ country: Country; index: number }> = React.memo(
  ({ country, index }) => {
    return (
      <tr
        key={country.code}
        className={`${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-gray-100 transition-colors`}
      >
        <td className={tableCellClass}>{country.code}</td>
        <td className={tableCellClass}>
          <div className="flex items-center gap-2">
            <span className="w-6 h-4">{country.emoji}</span>
            <span>{country.name}</span>
          </div>
        </td>
        <td className={tableCellClass}>{country.continent.name}</td>
        <td className={tableCellClass}>{country.currency}</td>
      </tr>
    );
  }
);

const CountryTable: React.FC<CountryTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full text-black border-collapse border border-gray-200">
        <thead className="bg-white">
          <tr>
            <th className={tableRowClass}>Code</th>
            <th className={tableRowClass}>Name</th>
            <th className={tableRowClass}>Continent</th>
            <th className={tableRowClass}>Currency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((country, index) => (
            <CountryRow key={country.code} country={country} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;
