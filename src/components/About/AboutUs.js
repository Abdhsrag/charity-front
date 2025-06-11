import React from "react";
import './AboutUs.css'
function AboutUs() {
  return (
    <div className="Container2">
      <h1>About Us</h1>
      <img src="/charity.png" alt="Charity" className="img"/>
      <p className="about">
        HopeHarpor is a non-profit organization dedicated to making a positive impact in communities around the world. We focus on initiatives that promote health, education, and sustainable development. Our team of dedicated volunteers and professionals work tirelessly to create lasting change through various programs and partnerships.
      </p>
      <p className="about">
        We believe that every individual deserves access to quality healthcare, education, and opportunities to improve their living conditions. Through community engagement, advocacy, and resource mobilization, we strive to empower people to build a better future for themselves and their families.
      </p>

      <h2>Our Mission</h2>
      <p className="mission">
        Our mission at HopeHarpor is to empower communities by providing access to essential resources and opportunities that foster health, education, and sustainable development. We are committed to creating inclusive programs that address the unique challenges faced by underserved populations and promote long-term positive change.
      </p>

      <h2>Our Values</h2>
      <ul className="values">
        <li><strong>Compassion:</strong> We deeply care about the well-being of every individual and community we serve.</li>
        <li><strong>Integrity:</strong> We act with honesty, transparency, and accountability in all our efforts.</li>
        <li><strong>Inclusivity:</strong> We embrace diversity and strive to ensure that everyone has equal access to opportunities.</li>
        <li><strong>Collaboration:</strong> We believe in working together with communities, partners, and volunteers to achieve meaningful impact.</li>
      </ul>

      <h2>Our Team</h2>
      <p className="team">
        Our team at HopeHarpor is made up of passionate and dedicated individuals from diverse backgrounds who share a common goal — to make a meaningful difference in the lives of others. We bring together experts in health, education, community development, and volunteer coordination to design and implement impactful projects.
      </p>
      <button className="lbtn">Learn More</button>
    </div>
  );
}

export default AboutUs;
