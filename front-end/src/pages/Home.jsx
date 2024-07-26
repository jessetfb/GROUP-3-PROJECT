import React, { useEffect } from 'react';
import { Container } from "react-bootstrap";
import CarsList from "../components/CarsList";
import { useOutletContext, useNavigate } from 'react-router-dom';

function Home() {
  const [searchTerm] = useOutletContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  

  console.log('Home searchTerm:', searchTerm);

  return (
    <Container>
      <CarsList searchTerm={searchTerm} />
    </Container>
  );
}

export default Home;
