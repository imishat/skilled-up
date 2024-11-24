"use client";

import Select from "react-select";

/**
 *
 * @param {defaultValue} defaultValue this is default value. when nothing is selected this value will be shown
 * @param {options} options this is option. when use click on select input field values will shown from here
 * @param {onChange} onChange this is a function
 * @returns JSX Element which is presenting the select option
 *
 * @example
 * ```
 * <SelectInput
 *  defaultValue = {option[0]}
 *  options = {option}
 *  onchange = {setValue((e)=>e.target.value)}
 * />
 *
 */

export const SelectInput = ({ defaultValue, options, onChange }) => {
  // custom styles
  const customStyles = {
    control: provided => ({
      ...provided,
      border: `1px solid #4b5563`,
      borderRadius: "5px",
      backgroundColor: "#242424",
      padding: "7px 0px",
      color: "#fff",
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: "#4b5563",
    }),
    option: (provided, isSelected) => ({
      ...provided,
      backgroundColor: isSelected ? "#4b5563" : "#2F3342",
      color: isSelected ? "#fff" : "#fff",
    }),
    singleValue: provided => ({
      ...provided,
      color: "#fff",
    }),
    input: provided => ({
      ...provided,
      color: "#fff",
    }),
  };
  return (
    <Select
      closeMenuOnSelect={true}
      styles={customStyles}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
