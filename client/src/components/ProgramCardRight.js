import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProgramCardRight = (props) => {
  const { title, subtitle, description, image, imageAlt} = props

  return (
    <div>
      <Container className="program-card">
        <Row>
          <Col sm={8}>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
            <p>{description}</p>
          </Col>
          <Col sm={4}>
            <img fluid src={image} alt={imageAlt} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProgramCardRight;