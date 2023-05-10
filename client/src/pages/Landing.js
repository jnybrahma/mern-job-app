import React  from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {

  return (
<Wrapper>
<nav>
 <Logo/>
</nav>
<div className="container page">
  {/* info */}
<div className="info">
<h1>Job tracking app</h1>
<p>
  I'm baby copper mug mlkshk chia, humblebrag knausgaard man braid slow-carb polaroid cliche glossier.
  Pinterest coloring book literally yes plz bushwick franzen cronut small batch.
</p>
<Link to="/register" className="btn btn-hero">
  Login/Register
</Link>
</div>
<img src={main}  alt='job hunt' className='img main-img'/>

</div>

</Wrapper>
  
  )
}
export default Landing