import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function WiewPageComponent() {
  const [issData, setISSData] = useState(null);
  const [starData, setStarData] = useState(null);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  // Log out function to log the user out of Google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(() => {
    // Función para cargar datos de ISS
    const fetchISSData = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const result = await response.json();
        setISSData(result);
      } catch (error) {
        console.error(error);
      }
    };

    // Función para cargar datos de estrellas
    const fetchStarData = async () => {
      const options = {
        method: 'GET',
        url: 'https://stars-by-api-ninjas.p.rapidapi.com/v1/stars',
        params: { name: 'Andromeda Galaxy' },
        headers: {
          'X-RapidAPI-Key': '8829d68d7fmsh8064becaa341a8cp15e52ajsn523003d1beec',
          'X-RapidAPI-Host': 'stars-by-api-ninjas.p.rapidapi.com',
        }
      };

      try {
        const response = await axios.request(options);
        setStarData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Cargar datos de ISS al montar el componente
    fetchISSData();

    // Cargar datos de estrellas al montar el componente
    fetchStarData();
  }, []); // Dependencias vacías para que se ejecute solo una vez al montar el componente

  // Función para cargar datos de Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀</button>
      )}

      {issData ? (
        <div>
          <h2>ISS Location</h2>
          <p>Latitude: {issData.iss_position.latitude}</p>
          <p>Longitude: {issData.iss_position.longitude}</p>
          <p>Speed: {issData.velocity} m/s</p>
          <p>Altitude: {issData.iss_position.altitude} km</p>
          <p>Timestamp: {new Date(issData.timestamp * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Loading ISS data...</p>
      )}

      {starData && starData.length > 0 ? (
        <div>
          <h2>Star Details</h2>
          <ul>
            {starData.map((star, index) => (
              <li key={index}>
                <strong>Name:</strong> {star.name}<br />
                <strong>Constellation:</strong> {star.constellation}<br />
                <strong>Right Ascension:</strong> {star.right_ascension}<br />
                <strong>Declination:</strong> {star.declination}<br />
                <strong>Apparent Magnitude:</strong> {star.apparent_magnitude}<br />
                <strong>Absolute Magnitude:</strong> {star.absolute_magnitude}<br />
                <strong>Distance (light years):</strong> {star.distance_light_year}<br />
                <strong>Spectral Class:</strong> {star.spectral_class}<br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading star data...</p>
      )}
    </div>
  );
}

export default WiewPageComponent;
