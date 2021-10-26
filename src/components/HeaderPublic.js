import React from 'react'
import { Link } from 'react-router-dom'
import '../style/HeaderPublic.css'
import logoRegistro from '../media/logobuho.png'
import { LogoutButton } from './Logout'

const HeaderPublic = () => {
    return (
        <header className="headerPublic">
            <nav>
                <ul className="ulHeaderPublic">
                    <li>
                        <a href='/admin/ventas'>
                            <img src={logoRegistro} class="logoHeaderPublic"alt="logo"/>
                        </a>
                    </li>
                    
                    <li><a href="#Inico"><button className="botonHeaderPublic">Inicio</button></a></li>
                    <li><a href="#quienesSomos"><button className="botonHeaderPublic">¿Quiénes somos? </button></a></li>
                    <li><a href="#queHacemos"><button className="botonHeaderPublic">¿Qué hacemos?</button></a></li>
                    <li>
                    
                        <Link to="/InicioSesion">
                            <button className="botonHeaderPublic">¡Iniciar ahora!</button>
                        </Link>
                    </li>
              
                </ul>
            </nav>
            
        </header>
        
    )
}

export default HeaderPublic