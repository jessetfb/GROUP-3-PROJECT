import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './Navbar';

function Layout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container>
        <Outlet context={[searchTerm, setSearchTerm]} />
      </Container>
    </>
  );
}

export default Layout;
