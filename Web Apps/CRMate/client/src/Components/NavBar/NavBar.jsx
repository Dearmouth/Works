import logo from "../../Assets/logo.svg";
import dataMigration from "../../Assets/DataMigration.svg";
import favorite from "../../Assets/Favorite.svg";
import addPeople from "../../Assets/addPeople.svg";
import people from "../../Assets/People.svg";
import logout from "../../Assets/logout.svg";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useMediaQuery } from "react-responsive";
import { logOut } from "../../Tools/utils";
import { useHistory } from "react-router-dom";

function NavBar() {
  let history = useHistory();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div>
      {/* add header for mobile version */}
      <div id="header-bg">
        {/* adjust font-size based on page selection */}
        {isDesktopOrLaptop ? (
          ""
        ) : (
          <div className="navbar-title">
            {["People", "Favorite"].includes(localStorage.getItem("nav-selector")) ? (
              <p id="large">{localStorage.getItem("nav-selector")}</p>
            ) : (
              <p id="small">{localStorage.getItem("nav-selector")}</p>
            )}
          </div>
        )}
      </div>

      {/* page selectors */}
      <div id="navbar-bg">
        <div id="navbar-logo-wrapper" onClick={() => history.push("/")}>
          <img src={logo} id="navbar-logo" alt="navbar-logo " />
          <div style={{fontFamily: "Sanchez One", fontWeight: "700"}} id="navbar-logo-text">CRMate</div>
        </div>

        <div id="navbar-grid">
          <Link to="/People">
            <button
              id={`${
                localStorage.getItem("nav-selector") === "People"
                  ? "people"
                  : ""
              }`}
              className="navbar-container"
              onClick={() => {
                localStorage.getItem("nav-selector");
              }}
            >
              <img src={people} alt="people" />
              <h3> People </h3>
            </button>
          </Link>

          <Link to="/Favorite" transition="default-fade">
            <button
              onClick={() => {
                localStorage.getItem("nav-selector");
              }}
              id={`${
                localStorage.getItem("nav-selector") === "Favorite"
                  ? "favorite"
                  : ""
              }`}
              className="navbar-container"
            >
              <img src={favorite} alt="favorite" />
              <h3>Favorite</h3>
            </button>
          </Link>

          <Link to="/AddContact">
            <button
              id={`${
                localStorage.getItem("nav-selector") === "AddContact"
                  ? "add"
                  : ""
              }`}
              className="navbar-container"
              onClick={() => {
                localStorage.getItem("nav-selector");
              }}
            >
              <img src={addPeople} alt="addPeople" />
              <h3>Add</h3>
            </button>
          </Link>

          <Link to="/Data">
            <button
              id={`${
                localStorage.getItem("nav-selector") === "Data"
                  ? "data-migration"
                  : ""
              }`}
              className="navbar-container"
              onClick={() => {
              }}
            >
              <img src={dataMigration} alt="dataMigration" />
              <h3>Import/Export</h3>
            </button>
          </Link>
        </div>

        {/* logout button */}
        <button
          id="navbar-logout"
          onClick={() => {
            logOut();
            
            localStorage.setItem("nav-selector", "People");
          }}
        >
          <Link to="/" />
          <img src={logout} alt="logout" />
          <div id="navbar-logout-text">Logout</div>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
