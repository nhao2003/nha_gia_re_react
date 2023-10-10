import { useSelector } from 'react-redux';
import { selectCurrentAccessToken, selectCurrentUser } from './authSlice';
import { Link } from 'react-router-dom';

function WelcomePage() : JSX.Element{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentAccessToken);
    
    const welcome = user !== null ? 'Welcome sucessfully' : 'Welcome fail';
    const tokenAbbr = `${token?.slice(0, 10)}...`;
    console.log(tokenAbbr);
    return (
        <div>
        <h1>{welcome}</h1>
        <h2>{tokenAbbr}</h2>
        <p><Link to="/userlist">Go to user list</Link></p>
        </div>
    );
};

export default WelcomePage;
