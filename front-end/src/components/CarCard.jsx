import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from '../utilis';

function CarCard(props) {
  const { id, name, current_location, description, imageURL, cost } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingError, setBookingError] = useState('');

  const handleViewClose = () => setShowViewModal(false);
  const handleViewShow = () => setShowViewModal(true);
  const handleBookClose = () => {
    setShowBookModal(false);
    setBookingError('');
  };
  const handleBookShow = () => setShowBookModal(true);

  const handleBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: id,
          user_id: 1, 
          cost: cost,
          start_date: startDate,
          end_date: endDate
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      alert('Booking successful!'); 
      handleBookClose();
    } catch (error) {
      console.error('Error booking car:', error);
      setBookingError(error.message);
    }
  };

  return (
    <Card style={{ width: '14rem' }} className="h-100">
      <Card.Img variant="top" src={imageURL} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          📍 {current_location}
        </Card.Text>
        <Card.Text>Ksh. 
          {cost}
        </Card.Text>
        <Button variant="primary" onClick={handleViewShow} className="me-4">
          View
        </Button>
        <Button onClick={handleBookShow}>
          Book
        </Button>
      </Card.Body>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Book Modal */}
      <Modal show={showBookModal} onHide={handleBookClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
          {bookingError && <p className="text-danger">{bookingError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBookClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default CarCard;