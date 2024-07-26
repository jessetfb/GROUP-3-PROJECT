import React from 'react'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../utilis';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/bookings`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete');
        }
        setBookings(bookings.filter(booking => booking.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Car ID</th>
          <th>Cost</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={booking.id}>
            <td>{index + 1}</td>
            <td>{booking.car_id}</td>
            <td>{booking.cost}</td>
            <td>{new Date(booking.start_date).toLocaleDateString()}</td>
            <td>{new Date(booking.end_date).toLocaleDateString()}</td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(booking.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Bookings;

