import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = (props): JSX.Element => {
    const history = useHistory();
    useEffect(() => {
        history.push('/login');
    })
    return <></>
}
export default Logout;