import React from 'react';

interface TextAreaFormProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({ label, id, value, onChange }) => {
    return (
        <div >
            <label
                className="block text-gray-700 text-sm font-bold mb-2 required"
                htmlFor={id}
            >
                {label}
            </label>
            <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextAreaForm;