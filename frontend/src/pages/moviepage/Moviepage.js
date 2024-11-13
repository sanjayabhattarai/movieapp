import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import '../../styles/Moviepage.css'; 

function Moviepage() {
    const { movieName } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await fetch(`http://localhost:3001/search-movies?query=${encodeURIComponent(movieName)}`);
          if (!response.ok) {
            throw new Error('Movie not found');
          }
  
          const data = await response.json();
          setMovie(data[0]); 
        } catch (err) {
          setError(err.message);
          setMovie(null);
        }
      };
  
      fetchMovie();
    }, [movieName]);
  
    if (error) {
      return (
        <div>
          <Navbar />
          <div className="moviepage-error-message">Error: {error}</div>
          <Footer />
        </div>
      );
    }
  
    if (!movie) {
      return (
        <div>
          <Navbar />
          <div className="moviepage-loading-message">Loading...</div>
          <Footer />
        </div>
      );
    }
  
    return (
      <div className="moviepage-main">
        <Navbar />
        
        <div className="moviepage-container">
          <div className="moviepage-details">
            <img src={movie.poster_path} alt={movie.title} className="moviepage-poster" />
            <div className="moviepage-info">
              <h1>{movie.title}</h1>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
            </div>
          </div>
          
          {/* Right-side component for movie showtime */}
          <div className="moviepage-showtime">
            <h2>Movie Showtime</h2>
            <p>Details will be added later.</p>
          </div>
          
        </div>
        <Footer />
      </div>
    );
}
  
export default Moviepage;