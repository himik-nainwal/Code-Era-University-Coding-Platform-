import React,{useState} from 'react'
import {IoMdClose, IoMdImage, IoMdMenu} from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {

    const [active,setActive] = useState(false)

    const activateNav = () => {
        setActive(!active)
    } 

  return (
    <div className={active ? 'header' : 'header-mobile'}>
               <div className='menu-icon' onClick={activateNav}>
                {!active ? <IoMdMenu className='menu'/> : <IoMdClose className='menu'/>}
               </div>
        <nav>
            <ul className={active ? 'ul-item' : 'ul-item oicon'}>
                <li>
                    <IoMdImage className='icon'/>
                    <Link to='/'>Alumni</Link>
                </li>
            

            </ul>
        </nav>

    </div>
  )
}

export default Sidebar