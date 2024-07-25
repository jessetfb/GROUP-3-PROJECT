import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CarCard(props) {

  const { name, current_location, description, imageURL, cost } = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: id,
          user_id: user_id,
          cost: cost

          // Add other necessary booking details here
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const data = await response.json();
      alert('Booking successful!'); // Replace with a more user-friendly notification
    } catch (error) {
      console.error('Error booking car:', error);
      alert('Failed to book the car. Please try again.'); // Replace with a more user-friendly error handling
    }
  };
  return (
    <Card style={{ width: '14rem' }} className="h-100">
      <Card.Img variant="top" src={imageURL} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>📍
          {/* <FontAwesomeIcon icon={faLocationDot} /> */}
          {current_location}
        </Card.Text>
        <Card.Text>Ksh.
          {cost}
        </Card.Text>
        <Button variant="primary" onClick={handleShow} className="me-4">
          View
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={() => handleBooking()}>Book</Button>
      </Card.Body>
    </Card>
  );
}

export default CarCard;