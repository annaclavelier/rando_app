const Hero = () => {
  return (
    <div
      className="hero-image min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient( rgba(216, 246, 222, 0.3) 0%,  /* 🌿 Vert clair avec 20% d'opacité */
          rgba(9, 191, 94, 0.5) 56%,   /* 🍃 Vert intermédiaire avec 20% d'opacité */
          rgba(0, 193, 97, 0.8) 100%), url(/assets/hero-moutain.jpg)`,
        height: "50%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="hero-text">
        <div className="d-flex contact-home justify-content-center">
          <div className="text-white ">
            <h1 className="mb-3 fw-bold">Explorez la nature</h1>
            <h4 className="mb-3 fw-bold">
              Partez à l'aventure avec Carnetd'Rando
            </h4>
            <button className="btn btn-outline-light btn-lg fw-bold">
              Découvrir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
