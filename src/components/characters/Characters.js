import React from 'react';
import classes from './Characters.css';
import Character from '../character/Character';

const characters = (props) => {
    let _characters = null
    if (props.characters && props.characters.length) {
        _characters = props.characters.map(char=>{
            return <Character character={char} key={char.id}></Character>
         })
    }
    return(
        <div className={classes.Characters}>
            {_characters}
        </div>
        
    )
}

export default characters;