import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import logo from "./assets/logo.png"
import logoAppointment from "./assets/logo-appointment.png"
import logoSignIn from "./assets/logo-signin.png"
import { useContext, useState } from 'react';
import userContext from './context/user.context';


function App() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext)
  const role = currentUser?.role
  const mql = window.matchMedia("(max-width: 810px)");
  const [openMenu, setOpenMenu] = useState(false);
  const [bar1, setBar1] = useState("bar1");
  const [bar2, setBar2] = useState("bar2");
  const [bar3, setBar3] = useState("bar3");

  function menu() {
    if (!openMenu) {
      setOpenMenu(true);
      setBar1("bar1-open");
      setBar2("bar2-open");
      setBar3("bar3-open");
    } else {
      setOpenMenu(false);
      setBar1("bar1");
      setBar2("bar2");
      setBar3("bar3");
    }
  }

  function logout() {
    setCurrentUser(null)
    window.localStorage.removeItem('APPToken');
    window.localStorage.removeItem('UserEmail');
    navigate("/")
  }
  const activePath = window.location.pathname

  return (
    <section className="App">
      <header className="header">
        <div className="logo-container">
          <img className='logo' src={logo} alt="" />
        </div>
        <div className="menu">
          {mql.matches ? (
            <div className="menuMobile">
              <div className="button" onClick={menu}>
                <div className={bar1}></div>
                <div className={bar2}></div>
                <div className={bar3}></div>
              </div>
              {!openMenu ? null : (
                <div className="menuOpen" onClick={menu}><NavLink className={activePath === "/Accueil" ? "link-active" : "link"} to="/Accueil">Accueil</NavLink>
                  <NavLink className={activePath === "/Salon" ? "link-active" : "link"} to="/Salon">Le salon</NavLink>
                  <NavLink className={activePath === "/Prestation" ? "link-active" : "link"} to="/Prestation">Prestation</NavLink>
                  <NavLink className={activePath === "/Tarif" ? "link-active" : "link"} to="/Tarif">Tarif</NavLink>
                  <NavLink className={activePath === "/Contact" ? "link-active" : "link"} to="/Contact">Contact</NavLink>
                  {role === "1" ? (<>
                    <NavLink className={activePath === "/Admin/Rendez-vous" ? "link-active" : "link"} to="/Admin/Rendez-vous">Gestion rendez-vous</NavLink>
                    <NavLink className={activePath === "/Admin/Utilisateurs" ? "link-active" : "link"} to="/Admin/Utilisateurs">Gestion utilisateurs</NavLink></>
                  ) : (role === "2" ? (<>
                    <NavLink className={activePath === "/User/Mes-rendez-vous" ? "link-active" : "link"} to="/User/Mes-rendez-vous">Mes rendez-vous</NavLink>
                  </>
                  ) : (
                    null
                  ))}
                  {currentUser ? (
                    role === "1" ? (
                      <NavLink className={activePath === "/Admin" ? "link-active" : "link"} to="/Admin">Mon compte</NavLink>
                    ) : (
                      <NavLink className={activePath === "/User" ? "link-active" : "link"} to="/User">Mon compte</NavLink>
                    )
                  ) : (
                    <NavLink className={activePath === "/login/signIn" ? "link-active" : "link"} to="/login/signIn">Se connecter</NavLink>
                  )}</div>)}

            </div>

          ) : (
            <div className="nav-bar">
              <NavLink className={activePath === "/Accueil" ? "link-active" : "link"} to="/Accueil">Accueil</NavLink>
              <NavLink className={activePath === "/Salon" ? "link-active" : "link"} to="/Salon">Le salon</NavLink>
              <NavLink className={activePath === "/Prestation" ? "link-active" : "link"} to="/Prestation">Prestation</NavLink>
              <NavLink className={activePath === "/Tarif" ? "link-active" : "link"} to="/Tarif">Tarif</NavLink>
              <NavLink className={activePath === "/Contact" ? "link-active" : "link"} to="/Contact">Contact</NavLink>
              {role === "1" ? (<>
                <NavLink className={activePath === "/Admin/Rendez-vous" ? "link-active" : "link"} to="/Admin/Rendez-vous">Gestion rendez-vous</NavLink>
                <NavLink className={activePath === "/Admin/Utilisateurs" ? "link-active" : "link"} to="/Admin/Utilisateurs">Gestion utilisateurs</NavLink></>
              ) : (role === "2" ? (<>
                <NavLink className={activePath === "/User/Mes-rendez-vous" ? "link-active" : "link"} to="/User/Mes-rendez-vous">Mes rendez-vous</NavLink>
              </>
              ) : (
                null
              ))}
              {currentUser ? (
                role === "1" ? (
                  <NavLink className={activePath === "/Admin" ? "link-active" : "link"} to="/Admin">Mon compte</NavLink>
                ) : (
                  <NavLink className={activePath === "/User" ? "link-active" : "link"} to="/User">Mon compte</NavLink>
                )
              ) : (
                <NavLink className={activePath === "/login/signIn" ? "link-active" : "link"} to="/login/signIn">Se connecter</NavLink>
              )}
            </div>)}


          <div className="appointment">
            <div className='welcome'>
              {currentUser ? <h2>Bonjour, {currentUser.firstname} !</h2> : <h1>Bienvenue chez Toutou Propre !</h1>}
              {currentUser ? <p onClick={logout} className='disconect'>Se deconnecter</p> : null}
            </div>
            <div className='logo-appointment'>
              <div className='logo-text' onClick={() => navigate("/Rendez-vous")}>Rendez-vous</div>
              <img className='logo ' src={logoAppointment} alt="" />
            </div>
          </div>
        </div>
      </header>
      <div className="card">
        <img className='logo logo-signIn' src={logoSignIn} alt="" />
        <Outlet />
      </div>
      <footer className="footer">
        FITSCH Yann
      </footer>
    </section>
  );
}

export default App;
