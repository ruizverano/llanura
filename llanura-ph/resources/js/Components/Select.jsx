export default function Select({ type = 'text', className = '',options, ...props }) {    
 
    // const handleChange = (e) => {
    //    console.log(e.target.value)
    //     const selectedValue = e.target.value;
    //     if (onchange) {
    //         onchange(selectedValue);
    //     }
    // };

    return (
        <select
            {...props}
            className={
                'rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            //onChange={handleChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
