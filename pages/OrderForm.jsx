import React, {useState, useEffect} from "react";
import "./OrderForm.css";
import "../images/iteration-1-images/logo.svg";
import "../images/iteration-2-images/pictures/form-banner.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MALZEMELER = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Japaleno",
  "Sarımsak",
  "Biber",
  "Ananas",
"Kabak",];
const BASE_PRICE = 85.5;
const EXTRA_PRICE = 5;
export default function OrderForm() {
  const [boyut, setBoyut] = useState("");
  const [hamur, setHamur] = useState("");
  const [malzemeler, setMalzemeler] = useState([]);
  const [not, setNot] = useState("");
  const [adet, setAdet] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const secimFiyat = malzemeler.length * EXTRA_PRICE;
  const toplam = (BASE_PRICE + secimFiyat) * adet;
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const toggleMalzeme = (item) => {
    if (malzemeler.includes(item)) {
      setMalzemeler(malzemeler.filter((m) => m !== item));
    } else if (malzemeler.length < 10) {
      setMalzemeler([...malzemeler, item]);
    }
  };
  useEffect(() => {
    const newErrors = {};
    if (!boyut) {
      newErrors.boyut = "Lütfen bir boyut seçin.";}
    if (!hamur) {
      newErrors.hamur = "Lütfen bir hamur seçin.";}
    if (malzemeler.length < 4) {
      newErrors.malzemeler = "En az 4 malzeme seçmelisiniz.";}
    if (malzemeler.length > 10) {
      newErrors.malzemeler = "En fazla 10 malzeme seçebilirsiniz.";}
  setErrors(newErrors);
  setIsValid(Object.keys(newErrors).length === 0);
}, [boyut, hamur, malzemeler]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setApiError("");
    setLoading(true);
      const payload = {
        boyut,
        hamur,
        malzemeler,
        not,
        adet,
        toplam: toplam.toFixed(2)
      };
      try {
        const response = await axios.post(
           "https://reqres.in/api/pizza",
            payload,
            { headers: { "x-api-key":"reqres_7cfca25ffb614a7683e0f905432ef9a1" } }
        );
          console.log("API Response:", response.data);
          setBoyut("");
          setHamur("");
          setMalzemeler([]);
          setNot("");
          setAdet(1);
          navigate("/success");
      } catch (error) {
        console.error("API Error:", error);
        setApiError("Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }}
  return (
    <div className="order-container">
      <div className="üst-taraf">
      <div className="form-banner">
        <div className="logo">
          <img src={"../images/iteration-1-images/logo.svg"} alt="Pizza Logo"  />
        </div>
        <img src={"../images/iteration-2-images/pictures/form-banner.png"} alt="Pizza Banner" />
      </div>
      <header className="order-header">
        Anasayfa - Seçenekler - <b>Sipariş Oluştur</b>
      </header>
      <div className="order-content">
        <h2>Position Absolute Acı Pizza</h2>
        <div className="price-row">
          <span className="price">{BASE_PRICE.toFixed(2)}₺</span>
          <span className="rating">4.9 (200)</span>
        </div>
        <div>
          <p className="description">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış,
            daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
            İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </div>
        </div>
      <form className="form-layout" onSubmit={handleSubmit}>
        
        <div className="left-area">
          {/* BOYUT SEÇİMİ */}
          <div className="section">
            <h4>Boyut Seç *</h4>
             {["Küçük", "Orta", "Büyük"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="boyut"
                  value={option}  
                  checked={boyut === option}
                  onChange={(e) => setBoyut(e.target.value)}
                />
                {option}
              </label>
            ))}
            </div>
          {/* HAMUR SEÇİMİ */}
          <div className="section">
            <h4>Hamur Seç *</h4>
            <select value={hamur} onChange={(e) => setHamur(e.target.value)}>
              <option value="">Hamur Seçin</option>
              <option value="İnce">İnce</option>
              <option value="Orta">Orta</option>
              <option value="Kalın">Kalın</option>
            </select>
          </div>
          {/* MALZEME SEÇİMİ */}
          <div className="section">
            <h4>Ek Malzemeler</h4>
            <p className="small-text">En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="checkbox-grid">
              {MALZEMELER.map((m) => (
                <label key={m}>
                  <input
                    type="checkbox"
                    checked={malzemeler.includes(m)}
                    onChange={() => toggleMalzeme(m)}
                  />
                  {m}
                </label>
              ))}              
            </div>
          </div>
           {/* SİPARİŞ NOTU */}
            <div className="section">
              <h4>Sipariş Notu</h4>
              <textarea
               placeholder="Sipariş notunuzu buraya yazabilirsiniz..."
               value={not}
               onChange={(e) => setNot(e.target.value)}
              />
            </div>
           {/* ALT TARAF */}
            <div className="bottom-section">
              <div className="counter">
                <button type="button" onClick={() => setAdet(Math.max(1, adet-1))}>-</button>
                <span>{adet}</span>
                <button type="button" onClick={() => setAdet(adet+1)}>+</button>
              </div>
              <div className="summary-card">
                <h4>Sipariş Toplamı</h4>
                <div className="summary-row">
                  <span>Seçimler:</span>
                  <span>{secimFiyat.toFixed(2)}₺</span>
                </div>
                <div className="summary-row-total">
                  <span>Toplam:</span>
                  <span>{toplam.toFixed(2)}₺</span>
                </div>
              </div>
              {apiError && <p className="error-message">{apiError}</p>}
              <button
                type="submit"
                className="order-button"
                disabled={!isValid || loading}
                style={{ opacity: isValid ? 1 : 0.5 }}
                >
                {loading ? "Sipariş Oluşturuluyor..." : "Siparişi Oluştur"} </button>
            </div>
        </div>
      </form> 
      </div>
    </div>
  );
  }