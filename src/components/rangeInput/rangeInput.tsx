import React, { HTMLAttributes, useState } from "react";

type IProps = Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> & {
    value: number;
    onChange?:(value: any) => void;
    minAgeFormValue: any,
    maxAgeFormValue: any
};

export type InputProps = IProps;

const RangeInput = ({value,minAgeFormValue,maxAgeFormValue, onChange, ...props}: IProps) => {


  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative w-full max-w-xl ">
        <div
          className="absolute left-0 top-6 transform -translate-x-1/2"
          style={{
            left: `calc(${(value - 8) / 92 * 100}%)`, 
          }}
        >
          <div className="bg-white text-custom-accent text-xs font-medium py-1 px-3 rounded border border-custom-lilic shadow-md">
            {value}
          </div>
        </div>
        <input
         {...props}
         onChange={onChange}
          id="age"
          type="range"
          min={minAgeFormValue}
          max={maxAgeFormValue}
          value={value}
          className=" 
           focus:outline-none focus:ring-0 accent-custom-accent w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          style={{
            background: `linear-gradient(to right, #7c3aed ${((value - 8) / 92) * 100}%, #CBB6E5 ${
              ((value - 8) / 92) * 100
            }%)`,
          }}
        />
      </div>
    </div>
  );
};

export default RangeInput;