import css from '../static/about.css';
const charlieLogo = "/16bitCharlie.png";

function About () {
    return (
        <div className="main_about">
            <p className="about">
                Hi, I'm Brittany. I'm an artist from Columbus, Ohio.  
                <br/>
                I don't have much for this space, so here's my cat Charlie:
                <br/><br/>
            </p>
            <img className="about_charlie"
                    src={charlieLogo}
            />
        </div>
    )
}

export default About;