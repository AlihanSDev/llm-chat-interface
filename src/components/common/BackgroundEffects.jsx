import React from 'react';
import '../../styles/App.css';

const BackgroundEffects = () => {
  return (
    <div className="background-effects">
      {/* Звездное небо */}
      <div className="stars">
        <div className="star" style={{ top: '10%', left: '15%' }}></div>
        <div className="star" style={{ top: '20%', left: '80%' }}></div>
        <div className="star" style={{ top: '30%', left: '25%' }}></div>
        <div className="star" style={{ top: '40%', left: '70%' }}></div>
        <div className="star" style={{ top: '50%', left: '10%' }}></div>
        <div className="star" style={{ top: '60%', left: '90%' }}></div>
        <div className="star" style={{ top: '70%', left: '35%' }}></div>
        <div className="star" style={{ top: '80%', left: '75%' }}></div>
        <div className="star" style={{ top: '15%', left: '50%' }}></div>
        <div className="star" style={{ top: '35%', left: '60%' }}></div>
        <div className="star" style={{ top: '55%', left: '40%' }}></div>
        <div className="star" style={{ top: '75%', left: '20%' }}></div>
        <div className="star" style={{ top: '25%', left: '85%' }}></div>
        <div className="star" style={{ top: '45%', left: '5%' }}></div>
        <div className="star" style={{ top: '65%', left: '95%' }}></div>
        <div className="star" style={{ top: '85%', left: '45%' }}></div>
        <div className="star" style={{ top: '5%', left: '30%' }}></div>
        <div className="star" style={{ top: '95%', left: '65%' }}></div>
      </div>
      
      {/* Переливающиеся космические облака */}
      <div className="cosmic-cloud cloud-1"></div>
      <div className="cosmic-cloud cloud-2"></div>
      <div className="cosmic-cloud cloud-3"></div>
      <div className="cosmic-cloud cloud-4"></div>
      
      {/* Мягкие светящиеся точки */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>
      <div className="glow-orb orb-4"></div>
    </div>
  );
};

export default BackgroundEffects;