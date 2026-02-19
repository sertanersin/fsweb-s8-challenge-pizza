import "./Success.css";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const siparis = location.state?.siparis;
  if (!siparis) return <div className="success-container">Sipariş bilgisi bulunamadı.</div>;

  return (
    <div className="success-container">
      <div className="success-content">
        <header className="success-header">
           <img 
            src="/images/iteration-1-images/logo.svg" 
            alt="Teknolojik Yemekler" 
            className="success-logo" 
          />
        </header>

        <div className="success-message">
          <p className="yellow-text">lezzetin yolda</p>
          <h1>SİPARİŞ ALINDI</h1>
        </div>
        
        <div className="success-details">
          <h3>Position Absolute Acı Pizza</h3>
          <div className="order-summary" style={{ textAlign: "left", marginTop: "20px" }}>
            <p>Boyut: <strong>{siparis.boyut}</strong></p>
            <p>Hamur: <strong>{siparis.hamur}</strong></p>
            <p>Ek Malzemeler: <strong>{siparis.malzemeler.join(", ")}</strong></p>
            <p>Sipariş Notu: <strong>{siparis.not || "-"}</strong></p>
          </div>
          <div className="total-box" style={{ border: "1px solid white", padding: "10px", marginTop: "20px" }}>
            <p>Toplam Fiyat: <strong>{siparis.toplam}₺</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Success;