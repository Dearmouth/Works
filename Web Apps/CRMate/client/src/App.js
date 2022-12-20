import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactForm from "./Components/ContactForm";
import People from "./Components/People/People";
import PrivateRoute from "./Components/PrivateRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Favorite from "./Components/People/Favorite";
import { isAuthenticated } from "./Tools/utils";
import ImportExport from "./Components/ImportExport";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure({
  autoClose: 5000,
  position: "top-center",
  hideProgressBar: false,
  newestOnTop: false,
  pauseOnHover: false,
  transition: Slide,
});

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/Register"
          component={isAuthenticated() ? People : Register}
        />
        <Route path="/Login" component={isAuthenticated() ? People : Login} />
        <Route path="/Resetpassword" component={ResetPassword} />
        <PrivateRoute path="/AddContact" component={ContactForm} />
        <PrivateRoute path="/People" component={People} />
        <PrivateRoute path="/Data" component={ImportExport} />
        <PrivateRoute path="/Favorite" component={Favorite} />
        <PrivateRoute path="/EditContact">
          <ContactForm editing={true} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
export default App;
