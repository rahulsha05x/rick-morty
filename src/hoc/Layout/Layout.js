import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../Auxiliary';


class Layout extends Component {
    state = {
        
    }

    render () {
        return (
            <Aux>
                <header>
                <header>
                    <h1 className={classes.Heading__Desktop}>Rick <span>And</span> Morty</h1>
                    <h1 className={classes.Heading__Mobile}>R <span>N</span> M</h1>
                </header>
                </header>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;