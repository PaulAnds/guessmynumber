import React from 'react';
import './Game.css';

const List = props => {
    
    const{items} = props;

    return (
        <ul>
        {
            items.map( (item, key) => (
                    <li 
                        key={key} 
                        className= "list"
                    >
                        {item.task}
                    </li> 
            ))
        }
        </ul>
    );
}

export default List;