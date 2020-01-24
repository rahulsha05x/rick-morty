import React from 'react';
import classes from './Character.css';

const character = (props) => {
    return (
        
        <article className={classes.Character}>
            <div  className={classes.Character__Card}>
                <div className={classes.Character__Image}>
                    <img src={props.character.image} alt={props.character.name}/>
                </div>
                <div className={classes.Character__Title}>
                    <h2 className={classes.Character__Name}>{props.character.name}</h2>
                    <p className={classes.Character__Description}>id: {props.character.id} - created 2 years ago</p>
                    </div>
                </div>
                <div  className={classes.Character__Info}>
                    <div className={classes.Character__Text}>
                        <span>STATUS</span>
                        <p>{props.character.status}</p>
                    </div>
                    <div className={classes.Character__Text}>
                        <span>SPECIES</span>
                        <p>{props.character.species}</p>
                    </div>
                    <div className={classes.Character__Text}>
                        <span>GENDER</span>
                        <p>{props.character.gender}</p>
                    </div>
                    <div className={classes.Character__Text}>
                        <span>ORIGIN</span>
                        <p>{props.character.origin.name}</p>
                    </div>
                    <div className={classes.Character__Text}>
                        <span>LAST LOCATION</span>
                        <p>{props.character.location.name}</p>
                    </div>
                </div>
        </article>
    )
}

export default character;