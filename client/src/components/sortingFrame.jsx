import React from 'react';

// frame that allows for rendering of the list
class Frame extends React.Component {
    render() { 
        return (
            <div className="frame"  >
                <div className="array" style={{height:"500px"}}>
                   
                    {this.props.list.map((element, index) => (
                        <div
                            className = {this.getClass(element.classType)}
                            key = {index}
                            style = {{height : `${4.5*element.key}px`}}
                            value = {element.key}>
                            {element.key}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // css classes are used the change the color of the elemets (indicates current state within the sort)
    getClass = (value) => {
        if(value === 0) return 'cell';
        else if(value === 1) return 'cell current';
        return 'cell done';
    };
}
 
export default Frame;