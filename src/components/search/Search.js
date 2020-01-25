import React, { Component } from 'react';
import classes from './Search.css';


class Search extends Component {
    state = {
        searchText: null
    }
    render(){
        return (
        <form className={classes.Search} >
            <input type='text' placeholder='Name' onChange={(event)=> this.setState({searchText:event.target.value})}
            name='searchText' className={classes.Search__Input}/>
            <button className={classes.Search__Button} onClick={(event)=> this.props.searchHandler(event,this.state.searchText)}>Search</button>
            
        </form>
        )
    }
}

export default Search;