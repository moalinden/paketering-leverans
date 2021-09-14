import React from "react";
import { Container, Row, Card} from 'react-bootstrap';

function AboutPage() {
  
    return (
  
  
      <Container fluid >
          <div className="d-flex justify-content-around">
  <Card style={{ width: '35rem', backgroundColor: '#F3E7DA' }}>
    
    <Card.Body>
      <Card.Title>The Wine Drinkers</Card.Title>
      <Card.Text>
        <Row>Axel Cabernet Sauvignon - A favourit for many, that's why I'm famous.</Row>
        <Row>Ivy Chardonnay - You just can't stop loving me.</Row>
        <Row>Clara Riesling - Because just like the grape, I'm perfection!</Row>
        <Row>Timmie Pinot Noir - I'm perfect to bring at every occation. The wine too!</Row>
        <Row>Rafsan Sauvignon Blanc - When you want something fresh in life!</Row>
        <Row>Pakorn Nebbiolo - Two words, strong and powerful. Women loves it.</Row>
        <Row>Moa Zinfandel - Either you love me or you hate me</Row>
      </Card.Text>
      
    </Card.Body>
  </Card>

  <Card style={{ width: '35rem', backgroundColor: '#F3E7DA' }}>
    
    <Card.Body>
    <Card.Title>But... How Did It Start?</Card.Title>
    <Card.Text>
       A sunny evening during summer 2021, a group of people where drinking wine. They really enjoyed it so they started to import wine that Systembolaget didn't have so that other people could have the same experience. The End.
      </Card.Text>
    </Card.Body>
  </Card>
</div>

  
      </Container>

      
      
    );
    
  }
  
  
  export default AboutPage;