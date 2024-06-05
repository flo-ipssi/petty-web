import React from 'react';

interface InputFormProps {
    label: string;
    id: string;
    type: string;
    value: string | number;
    min?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ label, id, type, value,min, onChange }) => {
    return (
        <div>
            <label
                className="block text-gray-700 text-sm font-bold mb-2 required"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                min={type === 'number' ? min : undefined}
            />
        </div>
    );
};

export default InputForm;