import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <>
      <Container fluid className="footer">
        <Row>
          <Col>© 2022 Copyright: San Diego Relentless | Beta Website by Jomel Bautista</Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
