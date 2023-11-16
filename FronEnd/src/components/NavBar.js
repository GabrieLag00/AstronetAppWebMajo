import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import ASTRONET from '../assets/img/ASTRONET.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const {isAuthenticated, logout, user} = useAuth();


  const [activeLink, setActiveLink] = useState('Inicio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
          <img src={ASTRONET} alt="ASTRONET" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/"> {/* Redirige al usuario a la página de inicio */}
              <Nav.Link href="#Inicio" className={activeLink === 'Inicio' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Inicio')}>Inicio</Nav.Link>
            </Link>
            <Nav.Link href="#Ubicación" className={activeLink === 'Ubicación' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Ubicación')}>Ubicación</Nav.Link>
            <Link to="/search"> {/* Redirige al usuario a la página de búsqueda */}
              <Nav.Link href="#Vistas" className={activeLink === 'Vistas' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Vistas')}>Vistas</Nav.Link>
            </Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="#"><img src={navIcon1} alt="" /></a>
              <a href="#"><img src={navIcon2} alt="" /></a>
              <a href="#"><img src={navIcon3} alt="" /></a>
            </div>
            {isAuthenticated ? (
              <>
               <li>
                Hola! {user.username}
               </li>
              <Link to="/" onClick={() => {logout()}}> 
                <button className="vvd"><span>Salir!</span></button>
              </Link>
              </>

            ) : (
              <>
            <Link to="/login"> 
              <button className="vvd"><span>Acceder!</span></button>
            </Link>
            <Link to="/register"> 
              <button className="vvd"><span>Conéctate!</span></button>
            </Link>
            </>
            )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
