import React from 'react';

// the speed option component for the sorting navbar
const Speed = (props) => {
    return (
        <span className="options">
            <select 
                name="Algorithm" id="menu" className="config-menu"
                onChange = {(e) => props.onChange(e.target.value, "speed")}>
                {props.speeds.map(element => (
                    <option className="config-option"
                        key = {element}
                        value = {element}>
                        {element}x
                    </option>
                ))}
            </select>
        </span>
    );
}
 
export default Speed;