import logo from "../../Assets/logo.svg";
import {useHistory} from "react-router-dom"

export const LogoWithText = () => {
  let history = useHistory(); 

  return(
  <div onClick={()=>history.push("/")} className="logo-wrapper">
  <img src={logo} alt="CRMate Logo" />
  <h1>CRMate</h1>
  </div>
  )
}