import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
        <div className="home-overlay">
       <h3>SUCCESS</h3>
       </div>
    </div>
  );
  }