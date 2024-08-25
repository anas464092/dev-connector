import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{borderTop:'1px solid #515151'}}>
            <Container>
                <Row>
                    <Col className='py-3 text-center'>
                        <p>Dev Connector &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
