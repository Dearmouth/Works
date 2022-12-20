import logo from "../../Assets/logo.svg";
import homeAnimation from "../../Assets/homeAnimation.gif";
import exportFiles from "../../Assets/export.svg";
import searchPeople from "../../Assets/searchPeople.svg";
import addPeople from "../../Assets/addPeople.svg";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import util from "../../Tools/utils";
import LogoutButton from "../Logout/LogoutButton";
function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  let history = useHistory();

  return (
    <div>
      <header>
        <img src={logo} id="home-logo" alt="logo" />
        <h1 id="home-logo-text">CRMate</h1>
        <div className = "home-buttons">
        {util.isAuthenticated() ? (
          <button className = "home-button" name = "dashboard-btn" onClick={() => {history.push('/' + localStorage.getItem("nav-selector")) }}>
            Dashboard
          </button>
        ) : (
          <button
            className = "home-button"  
            style = {{background:"#ECECEC"}}
            onClick={() => history.push("/Register")}
            name = "register-btn"
          >
            Register
          </button>
        )}
        {util.isAuthenticated() ? (
          <LogoutButton />
        ) : (
          <button className = "home-button" name = "login-btn" onClick={() => history.push("/Login")}>
            Login
          </button>
        )}
        </div>
      </header>

      <div id="green-bg">
        <h1 id="welcome">Welcome!</h1>
        <div id="welcome-sub">
          {isDesktopOrLaptop ? (
            <div>CRMate, a personal CRM system</div>
          ) : (
            <div> A personal CRM system</div>
          )}
        </div>
        <img src={homeAnimation} id="homeAnimation" alt=" Not found" />
        <div id="intro">A powerful personal relationship management tool</div>
      </div>

      <div className="buttom-wrapper">
        <div id="container" style={{ background: "#FAFAFA" }}>
          <img src={addPeople} alt="addPeople" />
          <h3>Easily save details of anyone you encountered.</h3>
        </div>

        <div id="container" style={{ background: "#ECECEC" }}>
          <img src={searchPeople} alt="searchPeople" />
          <h3>Search for people whenever you need. </h3>
        </div>

        <div id="container" style={{ background: "#F4F4F4" }}>
          <img src={exportFiles} alt="exportFiles" />
          <h3>Transfer Data by downloading it in a useful format </h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
