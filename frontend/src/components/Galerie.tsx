import { useEffect, useState, useRef } from "react";

interface Props {
  images: string[]
}

const Galerie = ({images}:Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const carouselInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselInner = carouselInnerRef.current;
    if (carouselInner) {
      carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [scrollPosition]); // Exécute scrollTo dès que scrollPosition change

  function prev() {
    if (carouselInnerRef.current) {
      const cardWidth = carouselInnerRef.current.children[0]?.clientWidth || 0;
      setScrollPosition((prev) => Math.max(prev - cardWidth, 0)); // Assure que scrollPosition ne devient pas négatif
    }
  }

  function next() {
    if (carouselInnerRef.current) {
      const cardWidth = carouselInnerRef.current.children[0]?.clientWidth || 0;
      const maxScroll = carouselInnerRef.current.scrollWidth - carouselInnerRef.current.clientWidth;
      setScrollPosition((prev) => Math.min(prev + cardWidth, maxScroll)); // Empêche de scroller au-delà des limites
    }
  }

  return (
    <>
      <div id="carouselGalerie" className="carousel">
        <div ref={carouselInnerRef} className="carousel-inner p-2">
          {images.map((image, index) => (
            <div className="carousel-item d-inline-block" key={index} style={{ width: "300px" }}>
              <div className="card">
                <div className="img-wrapper">
                  <button className="border-0 bg-transparent p-0" onClick={() => setSelectedImage(image)}>
                    <img src={`/assets/${image}`} className="d-block w-100" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={prev}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={next}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>

      {selectedImage && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={() => setSelectedImage(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={`/assets/${selectedImage}`} className="img-fluid" alt="Aperçu" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Galerie;
