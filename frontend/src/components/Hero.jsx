import "./Hero.css";
import heroImage from "../assets/hero.png";
import { useNavigate } from "react-router-dom";

function Hero(){

const navigate = useNavigate();

return(

<section
className="hero-section"
style={{backgroundImage:`url(${heroImage})`}}
>

<div className="hero-content">

<h1>Minimal Clothing</h1>

<p>
Timeless essentials designed for everyday life.
Clean design. Premium comfort.
</p>

<button onClick={()=>navigate("/men")}>
Shop Collection
</button>

</div>

</section>

)

}

export default Hero;