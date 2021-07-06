import '../css/About.css';
import about from '../assets/about.png'

const About = () => {
  // about page
  return (
    <div className="about">
      <h3><b> About </b></h3>
      <p>
        The 'askmeanything' project was developed under the supervision
        and guidance of the National Technical University of Athens (NTUA) professors <a
        href="http://www.survey.ntua.gr/en/dep/veskoukis-vasileios"> Vescoukis
        Vassilios</a>, <a href="https://www.ece.ntua.gr/en/staff/71"> Papaspyrou
        Nikolaos </a> and <a href="https://www.ece.ntua.gr/en/staff/39"> Tsanakas
        Panayiotis</a>, as part of the 'Software as a Service' course of the
        Electrical and Computer School of Engineering (ECE) of the same university.
        The project's goal was to create a Q&A platform where users can <br/> browse
        existing questions and answers, post and answer questions, as well as
        view personalized and general usage statistics.
        <br/>
        <br/>
        The version presented here was developed by Xigkou Iliana
        and Myropoulou Nefeli, two ECE NTUA undergraduate students, currently
        in their fourth year of studies.
      </p>
      <img src={about} alt="about page"/>
    </div>
  );
}

export default About;
