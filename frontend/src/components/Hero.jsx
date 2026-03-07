import "./Hero.css";
import heroImage from "../assets/hero.png";

function Hero(){

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

<button>Shop Collection</button>

</div>

</section>

)

}

export default Hero;