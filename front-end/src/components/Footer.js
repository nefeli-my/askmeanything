import '../css/Footer.css';

const Footer = () => {
  // footer with github, documentation and course links
  return (
    <div className="footer">
      <div className="links">
        <a href="/about">
          about 
        </a>
        <a href="/contactus">
          contact us
        </a>
        <a href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">
          course materials
        </a>
        <a href="/documentation">
          documentation
        </a>
        <a href="https://github.com/nefeli-my/askmeanythingv2">
          github
        </a>
      </div>
      <div className = "our-names">
        <p> provided by Iliana Xigkou & Nefeli Myropoulou. 👩‍💻 </p>
      </div>
    </div>
  );
}

export default Footer;
