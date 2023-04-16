import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {

  return (
<Wrapper>
<nav>
  <img src={logo} alt="jobify" className='logo'/>
</nav>
<div className="container page">
  {/* info */}
<div className="info">
<h1>Job tracking app</h1>
<p>
  I'm baby copper mug mlkshk chia, humblebrag knausgaard man braid slow-carb polaroid cliche glossier.
  Pinterest coloring book literally yes plz bushwick franzen cronut small batch.
</p>
<button className="btn btn-hero">
  Login/Register
</button>
</div>
<img src={main}  alt='job hunt' className='img main-img'/>

</div>

</Wrapper>
  
  )
}
export default Landing