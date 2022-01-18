
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <>
      <Container fluid className='bg-dark text-white ft py-4'>
        <Row className='footer-text'>
          <Col lg={true}>
            <p>
              Admatric is a Dapp in which an advertisement space is available for anyone to buy. 
            </p>
          </Col>
          <Col lg={true}>
            <p>
              Pay more than the last buyer and you get the adspace for your brand!
              This project is a part of <a href="https://ethhole.com/challenge" target="blank" style={{color: "lightgreen"}} >challenge on EthHole </a>
            </p>
          </Col>
          <Col lg={true}>
            <ul className='list-unstyled'>
              <li>
                <h5>Developer Links</h5>
              </li>
              <a href="https://www.linkedin.com/in/rharshit82/" target="blank" style={{color: "lightgreen"}} ><li className='links'>Linkedin</li></a>
              <a href="https://github.com/rharshit82" target="blank" style={{color: "lightgreen"}} ><li className='links'>Github</li></a>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <p>Copyright &copy; 2021 Admatric</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Footer