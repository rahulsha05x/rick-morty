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
  shouldComponentUpdate(nextProps,nextStates) {
    if(nextStates.sortBy === 'id' && nextStates.sortDirection === 'asc') {
      return true;
    }
    if(this.state.characters !== nextStates.characters) {
      return true;
    }
    if(this.state.sortBy !== nextStates.sortBy ||
      this.state.sortDirection !== nextStates.sortDirection ) {
        return true;
      }
      return false;
  }
  componentDidUpdate(prevProps,prevState) {
    
    if(this.state.sortBy !== prevState.sortBy ||
      this.state.sortDirection !== prevState.sortDirection ) {
        this.sortResults(this.state.sortBy,this.state.sortDirection);
      }
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
    this.setState({sortBy:e})
  }
  changeSorter(e, v) {
    const allSiblings = e.currentTarget.parentNode.children;
    for(let s of allSiblings) {
      s.style.backgroundColor = 'white';
      s.style.color = 'black';
    }
    e.target.style.backgroundColor = 'blue';
    e.target.style.color = 'white';
    this.setState({sortDirection:v});
  }
  sortResults(by, direction) {
    const _characters = [...this.state.characters];
    if (by === 'name') {
      
      if(direction === 'asc') {
        _characters.sort((a,b)=>{
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
        _characters.sort((a,b)=>{
          if (a['name'] > b['name']) {
            return -1;
        }
        if (b['name'] > a['name']) {
            return 1;
        }
          return 0;
        });
        
      }
      this.setState({characters:_characters});
      
    }
    if (by === 'id') {

      
      if(direction === 'asc') {
        _characters.sort((a,b)=>{
          return a['id'] - b['id'];
        });
      }
      if(direction === 'dsc') {
        _characters.sort((a,b)=>{
          return b['id'] - a['id'];
        });
      }
      
      this.setState({characters:_characters})
    }
  }
  render() {
    console.log("[Render]")
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
                    <li style={{backgroundColor:'blue',color:'white'}}onClick={(e)=>this.changeSorter(e,'asc')}>Ascending</li>
                    <li onClick={(e)=>this.changeSorter(e,'dsc')}>Descending</li>
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
