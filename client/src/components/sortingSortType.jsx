import React from 'react';

import Algorithms from './sorting-navbar/algorithms';

// part of the navbar
class SortType extends React.Component {
    state = {
        Algorithms: [
			{ value: 1, type: 'Bubble Sort' },
			{ value: 2, type: 'Insertion Sort' },
			{ value: 3, type: 'Merge Sort' },
			{ value: 4, type: 'Quick Sort' },
            { value: 5, type: 'Heap Sort' },
		]
    };

    // makes the button visible/invisible
    handleClick = (e) => {
        e.preventDefault();
        this.props.response();
    }

    render() {
        return (
            <div className="navbar-algorithms" id="navbar">
                <Algorithms 
                    onChange = {this.props.onChange}
                    algorithms = {this.state.Algorithms}
                />
            </div>
        );
    }
}
 
export default SortType;