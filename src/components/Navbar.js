import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div >
            <div className="nav space-between general-padding">
                <Link to='/'>Home</Link>
                <Link to='/task-list'>Task List</Link>
                <Link to='/create'>Create</Link>
            </div>
            <hr/>            
        </div>
    )
}
