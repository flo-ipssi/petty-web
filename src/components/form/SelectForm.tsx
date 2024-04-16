import React from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

const SelectForm: React.FC<SelectProps> = ({label,id,value,onChange,options,}) => {
    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2 required"
                htmlFor={id}
            >
                {label}
            </label>
            <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                value={value}
                onChange={onChange}
            >
                <option value="">{`Sélectionner ${label.toLowerCase()}`}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectForm;
