import React, { useEffect } from "react";
import "./About.css";
import { BarChart3, FileDown, Globe, Leaf, Mail, ShieldCheck } from "lucide-react";

const About = () => {
  useEffect(() => {
    // Add scroll animation for sections
    const sections = document.querySelectorAll('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="about-container">
      <div className="about-background"></div>
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="title-gradient">About: Komatsu ESG &amp; Safety Experience</h1>
          <div className="subtitle-container">
            <p>
              This website has been revised into two core experiences: an ESG transition
              calculator for fleets and a dashboard-style ESG &amp; Safety monitor.
            </p>
            <div className="about-hero-decoration"></div>
          </div>
        </div>
      </div>

      {/* Main content with sections */}
      <div className="sections-container">
        {/* What is This Project About? */}
        <section className="about-section" id="about">
          <div className="section-inner">
            <div className="section-icon">
              <Globe size={32} strokeWidth={1.5} />
            </div>
            <h2>What is this site?</h2>
            <div className="section-content">
              <p>
                It is a tender-ready concept that demonstrates how Komatsu fleet solutions can support
                ESG reporting and safety governance. The focus is on two key outcomes:
                greenhouse gas (GHG) reduction and hazardous waste elimination.
              </p>
            </div>
            <div className="section-bg section-bg-1"></div>
          </div>
        </section>

        {/* Calculator */}
        <section className="about-section" id="calculator">
          <div className="section-inner">
            <div className="section-icon">
              <Leaf size={32} strokeWidth={1.5} />
            </div>
            <h2>Bina Pertiwi Sustainability Calculator</h2>
            <div className="section-content">
              <ul className="feature-list">
                <li>
                  <span className="feature-icon"><BarChart3 size={20} /></span>
                  <span className="feature-text">Fleet Profile → Usage Intensity → Comparison Target</span>
                </li>
                <li>
                  <span className="feature-icon"><ShieldCheck size={20} /></span>
                  <span className="feature-text">Outputs headline CO2 savings + hazardous lead waste elimination</span>
                </li>
                <li>
                  <span className="feature-icon"><FileDown size={20} /></span>
                  <span className="feature-text">CTA to download an ESG tender support document (PDF)</span>
                </li>
                <li>
                  <span className="feature-icon"><Globe size={20} /></span>
                  <span className="feature-text">Built for early awareness + tender preparation</span>
                </li>
              </ul>
            </div>
            <div className="section-bg section-bg-2"></div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="about-section" id="dashboard">
          <div className="section-inner">
            <div className="section-icon">
              <BarChart3 size={32} strokeWidth={1.5} />
            </div>
            <h2>Komatsu Fleet Command: ESG &amp; Safety Monitor</h2>
            <div className="section-content">
              <p>
                The Home page is now redesigned as a dashboard that represents an integrated view of
                Komtrax/EVCloud environmental analytics and Safety/K3 compliance readiness:
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon"><Leaf size={20} /></span>
                  <span className="feature-text">Eco-Monitor: real-time emission tracking and reporting exports</span>
                </li>
                <li>
                  <span className="feature-icon"><ShieldCheck size={20} /></span>
                  <span className="feature-text">Safety &amp; K3: audit readiness, battery health, operator badges</span>
                </li>
                <li>
                  <span className="feature-icon"><FileDown size={20} /></span>
                  <span className="feature-text">Compliance Center: download GRI/SASB + K3 template pack</span>
                </li>
              </ul>
            </div>
            <div className="section-bg section-bg-3"></div>
          </div>
        </section>

        {/* Contact */}
        <section className="about-section" id="contact">
          <div className="section-inner">
            <div className="section-icon">
              <Mail size={32} strokeWidth={1.5} />
            </div>
            <h2>Contact</h2>
            <div className="section-content">
              <p>
                For a formal tender-ready report and integration discussion, contact{" "}
                <a href="mailto:greenfleet@astra.co.id" className="highlight-link">
                  greenfleet@astra.co.id
                </a>
                .
              </p>
            </div>
            <div className="section-bg section-bg-4"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
