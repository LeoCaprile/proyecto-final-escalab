import React from 'react'


export default function OptionSelect({ options, setCategory }) {

   
    const handleChange = (e) => {
        const optionValue = e.target.value
        setCategory(optionValue)
    }

    return (
     
            <select onChange={handleChange} className="border-gray-200 border-2 pr-5 py-2 font-bold text-2xl outline-none rounded-lg">
                    <option hidden defaultValue>Selecciona una categoria</option>
                    {options.map((option) => 
                            <option className='font-bold' key={option.value} value={option.value}>{option.name}</option>
                    )}
            </select>
    
    );
};


