import { useState } from 'react'

export default function Player({ initName, symbol, isActive, onChangeName }) { 
    const [name, setName] = useState(initName)
    const [isEditing, setIsEditing] = useState(false)

    function handleChange(e) { 
        setName(e.target.value)
    }

    function handleEdit() { 
        setIsEditing((prevEditing) => !prevEditing)
        if (isEditing) { 
            onChangeName(symbol, name)
        }
    }

    let playerName = <span className="player-name">{name}</span>

    if (isEditing) { 
        playerName = <input isrequired type='text' value={name} onChange={handleChange} />
    }

    return (
        <li className={ isActive? 'active' : undefined}>
        <span className="player">
                {playerName}
            <span className="player-symbol">{ symbol }</span>
        </span>
            <button onClick={handleEdit}>{ isEditing? 'Save' : 'Edit' }</button>
      </li>  
    )
}