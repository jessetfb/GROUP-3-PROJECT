import { Container } from "react-bootstrap";
import CarsList from "../components/CarsList";
import { useOutletContext } from 'react-router-dom';

function Home() {
  const [searchTerm] = useOutletContext();
  console.log('Home searchTerm:', searchTerm);
  return (
    <>
      <Container >
        <CarsList searchTerm={searchTerm}/>
      </Container>
    </>
  );
}

export default Home;
