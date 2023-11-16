import React, { useState, useEffect } from "react";
import "./styles/SearchPage.css"; // Importa tus estilos CSS
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from '../components/NavBar';
import {Footer} from '../components/Footer'



function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Función para buscar imágenes en la NASA API
    const searchImages = async () => {
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`
        );
        const data = await response.json();
        setSearchResults(data.collection.items);
      } catch (error) {
        console.error("Error al buscar imágenes:", error);
      }
    };

    // Realizar la búsqueda cuando cambia el término de búsqueda
    if (searchTerm.trim() !== "") {
      searchImages();
    }
  }, [searchTerm]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const clearImages = () => {
    setSearchResults([]);
  };

  return (
    
    <div>
         <NavBar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={clearImages} className="clear-button">
          Limpiar
        </button>
      </div>
      <div className="image-grid">
        {searchResults.map((image, index) => (
          <div
            key={index}
            className="image-card"
            onClick={() => handleImageClick(image)}
          >
            <div className="image-target">
              <img src={image.links[0].href} alt={image.data[0].title} />
              <div className="image-info">
                <p>{image.data[0].title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-popup" onClick={handleImageClose}>
          <div className="image-popup-content">
            <img
              src={selectedImage.links[0].href}
              alt={selectedImage.data[0].title}
            />
            <div className="image-info">
              <p>{selectedImage.data[0].title}</p>
              <p>Fecha: {selectedImage.data[0].date_created}</p>
              <p>Creador: {selectedImage.data[0].center}</p>
              <p>Descripción: {selectedImage.data[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
