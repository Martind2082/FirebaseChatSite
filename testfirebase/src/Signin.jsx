import { Authcontext } from "./Authcontext";
import { useContext } from "react";

const Signin = () => {
    const {googlesignin} = useContext(Authcontext);
    return (<div>
        <p>Sign in page</p>
        <button onClick={googlesignin}>Sign in with google</button>
    </div>);
}
 
export default Signin;