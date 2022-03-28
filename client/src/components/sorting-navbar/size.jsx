import React from 'react';

// the size or number of items option component for the sorting navbar
const Size = (props) => {
    return (
        <span className="options">
            <select 
                name="size" id="menu" className="config-menu"
                onChange = {(e) => props.onChange(e.target.value, "size")}>
                {props.lengths.map(element => (
                    <option className="config-option" 
                        key = {10*element}
                        value = {element}>
                        {element}
                    </option>
                ))}
            </select>
        </span>
    );
}
 
export default Size;