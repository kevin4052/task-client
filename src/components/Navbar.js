import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="nav space-between general-padding">
            <div>
                <Link to='/'>Home</Link>
                <Link to='/task-list'>Task List</Link>
            </div>
            
        </div>
    )
}
