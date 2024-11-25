import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between item-center px-4 py-5 h-14">
            <div className='logo font-bold  '>
                <span className='text-green-700 text-white text-2xl'> </span>
                &lt;
                Pass_Man
                <span className='text-green-700'>_Pro/ &gt;</span>
                
                </div>
                <ul style={{display:'flex',gap:'10px'}}>
                <li><Link to="/manager">Manager</Link></li>
                <li><Link to="/generator">Generator</Link></li>
                </ul>
            </div>
        
    </nav>
  )
}

export default Navbar
