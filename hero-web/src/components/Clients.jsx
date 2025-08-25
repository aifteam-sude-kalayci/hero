import './Clients.css';
import grafikImg from '../assets/slider/grafik.jpg';
import sapImg from '../assets/slider/sap.jpg';
import webtkImg from '../assets/slider/web-tk.jpg';

export default function Clients() {
  return (
    <section className="clients-section">
      <h2>Yazılım<br />Çözümlerimiz</h2>
      <div className="clients-grid">
        <div className="card">
          <div className="card-inner" style={{ "--clr": "#fff" }}>
            <div className="box">
              <div className="imgBox">
                <img src={grafikImg} alt="Trust & Co." />
              </div>
              <div className="icon">
                <a href="#" className="iconBox">
                  <span className="material-symbols-outlined">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
          <div className="content">
            <h3>Grafik Tasarım Çözümleri</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,</p>
          </div>
        </div>

        <div className="card">
          <div className="card-inner" style={{ "--clr": "#fff" }}>
            <div className="box">
              <div className="imgBox">
                <img src={sapImg} alt="Tonic" />
              </div>
              <div className="icon">
                <a href="#" className="iconBox">
                  <span className="material-symbols-outlined">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
          <div className="content">
            <h3>SAP Çözümleri</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,</p>
          </div>
        </div>

        <div className="card">
          <div className="card-inner" style={{ "--clr": "#fff" }}>
            <div className="box">
              <div className="imgBox">
                <img src={webtkImg} alt="Shower Gel" />
              </div>
              <div className="icon">
                <a href="#" className="iconBox">
                  <span className="material-symbols-outlined">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
          <div className="content">
            <h3>Web Tasarım Çözümleri</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur repellendus nostrum,</p>
          </div>
        </div>
      </div>
    </section>
  );
}
