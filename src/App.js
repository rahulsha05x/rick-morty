import React, { Component } from 'react';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import axios from 'axios';
import Characters from './components/characters/Characters';
import Search from './components/search/Search';
import Filter from './components/filter/Filter'

class App extends Component {
  state = {
    characters: [],
    sortBy: 'id',
    sortDirection: 'asc'
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios.get('https://rickandmortyapi.com/api/character/ ').then(
      response =>{
        const dummy = response.data.results.slice();
        this.setState({characters:dummy});
      }
    )
  }
  searchHandler = (event,search)=>{
    event.preventDefault();
    console.log(search);
    const characters = [...this.state.characters];
    if(search && search.length >= 3) {
      
      let filteredResult = characters.filter(char=>{
        if(char.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return char;
        }
        return null;
      });
      console.log(filteredResult)
      if(filteredResult && filteredResult.length ) {
        this.setState({characters:filteredResult});
      }
    } else {
      this.loadData();
    }
  }
  sortHandler = (e,h)=>{
    this.setState((prevState)=>{
      if(prevState.sortDirection !== e) {
        return {sortBy:e}
      }
    });
    this.sortHandler(this.state.sortBy,this.state.direction)
    
  }
  changeSorter(v) {
    this.setState((prevState)=>{
      if(prevState.sortDirection !== v) {
        return {sortDirection:v}
      }
    });
    this.sortHandler(this.state.sortBy,this.state.direction)
  }
  sortResults(by, direction) {
    if (by === 'name') {
      const characters = this.state.characters.slice();
      if(direction === 'asc') {
        characters.sort((a,b)=>{
          if (a['name'] < b['name']) {
            return -1;
        }
        if (b['name'] < a['name']) {
            return 1;
        }
          return 0;
        });
        
      } 
      if(direction === 'dsc') {
        characters.sort((a,b)=>{
          if (a['name'] > b['name']) {
            return -1;
        }
        if (b['name'] > a['name']) {
            return 1;
        }
          return 0;
        });
        
      }
      this.setState({characters:characters});
      
    }
    if (by === 'id') {

      const characters = this.state.characters.slice();
      if(direction === 'asc') {
        characters.sort((a,b)=>{
          return a['id'] - b['id'];
        });
      }
      if(direction === 'dsc') {
        characters.sort((a,b)=>{
          return b['id'] - a['id'];
        });
      }
      
      this.setState({characters:characters})
    }
  }
  render() {
    return (
      
        <Layout>
          <div className={classes.App}>
            <div className={classes.App__Header}>
            <div style={{marginTop:10}}>
              Search by Name
              <Search searchHandler={this.searchHandler}/>
              </div>
              <div>
                <Filter sortHandler={this.sortHandler}/>
                <div className={classes.Filter__List__wrapper}>
                  <ul className={classes.Filter__List}>
                    <li onClick={()=>this.changeSorter('asc')}>Ascending</li>
                    <li onClick={()=>this.changeSorter('dsc')}>Descending</li>
                  </ul>
                </div>
              </div>
              
            </div>
            <div className={classes.App__Characters}>
              <Characters characters={this.state.characters}/>
            </div>
          </div>
        </Layout>
      
    );
  }
}

export default App;
