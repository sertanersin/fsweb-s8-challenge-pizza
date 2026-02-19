import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <div className="home-content">
        <img 
          src="/images/iteration-1-images/logo.svg"
          alt="Teknolojik Yemekler" 
          className="home-logo"
        />
        
        <div className="home-text">
          <p className="yellow-italic">fırsatı kaçırma</p>
          <h1>KOD ACIKTIRIR <br/> PİZZA, DOYURUR</h1>
        </div>

        <button
          className="home-button" 
          onClick={() => navigate("/siparis")}
          id="order-pizza"
        >
          ACIKTIM
        </button>
      </div>
    </div>
  );
}