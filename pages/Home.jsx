import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
     <div className="home-overlay">
            <h3>Teknolojik Yemekler</h3>
            <h1>KOD ACIKTIRIR <br/> PİZZA, DOYURUR</h1>

            <button onClick={() => navigate("/siparis")}>Sipariş Ver</button>
       </div>
    </div>
  );
  }