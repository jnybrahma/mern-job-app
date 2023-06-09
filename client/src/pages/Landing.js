import React  from 'react';
import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useAppContext } from '../context/appContext';

const Landing = () => {
 const { user } = useAppContext();

  return (
    <React.Fragment>

    {user && <Navigate to='/'/>}
<Wrapper>
<nav>
 <Logo/>
</nav>
<div className="container page">
  {/* info */}
<div className="info">
<h1>Job tracking app</h1>
<p>
 Hi! This is demo app to record job applications. Applicant can save and record job application data.
</p>
<Link to="/register" className="btn btn-hero">
  Login/Register
</Link>
</div>
<img src={main}  alt='job hunt' className='img main-img'/>

</div>

</Wrapper>
  </React.Fragment>
  )
}
export default Landing