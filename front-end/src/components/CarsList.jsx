import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CarCard from './CarCard';
import { BASE_URL } from '../utilis';

function CarsList({ searchTerm}) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cars`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('CarsList searchTerm:', searchTerm)
  console.log('Cars:', cars)

  const filteredCars = cars.filter(car =>
    (car.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (car.current_location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mt-3">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Col key={car.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <CarCard 
                name={car.name}
                current_location={car.current_location}
                cost={car.cost}
                imageURL={car.imageURL}
                description={car.description}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p>No cars found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CarsList;