import React, { Component } from 'react';
import classes from './Filter.css';

class Filter extends Component {
    state = {
        sortPreference: 'id',
        sortBy: 'asc'
    }
    sortPrefHandler(choice) {
        this.setState({sortPreference:choice});
    }
    render(){
        return (
        <div className={classes.Filter}>
            <select className={classes.Filter__Select} 
            onChange={(event)=>this.props.sortHandler(event.target.value,this.state.sortPreference)}>
                <option value='id'>Sort By ID</option>
                <option value='name'>Sort By Name</option>
            </select>
        </div>
    )
    }
}

export default Filter;