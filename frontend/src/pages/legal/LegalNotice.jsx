import { Link } from "react-router-dom";
import "./Legal.css";

function LegalNotice() {

return (

<div className="legal-page">

<div className="legal-header">

<div className="legal-breadcrumb">
<Link to="/">Home</Link> / Legal Notice
</div>

<h1>Legal Notice</h1>

</div>


<div className="legal-content">

<p>
Information according to §5 TMG.
</p>

<p>
MIRO Clothing<br/>
Düsseldorf, Germany
</p>

<p>
Email: contact@miro-clothing.com
</p>

<p>
Responsible for content according to §55 Abs. 2 RStV.
</p>

</div>

</div>

);

}

export default LegalNotice;