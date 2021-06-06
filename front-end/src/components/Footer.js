import '../css/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="links">
        <a href="https://github.com/nefeli-my/askmeanythingv2">
          link on github
        </a>
        <a href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">
          course materials
        </a>
      </div>
      <div className = "our-names">
        <p> provided by Iliana Xigkou & Nefeli Myropoulou. 👩‍💻 </p>
      </div>
    </div>
  );
}

export default Footer;
