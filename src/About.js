import React from "react";
import { Container, Row, Card } from 'react-bootstrap';

import './about.css'

function AboutPage() {
  return (
    <Container fluid style={{ minHeight: '100vh' }}>
      <div className="d-flex justify-content-around" id="about">
        <Card style={{ width: '35rem', backgroundColor: '#F3E7DA', padding:'10px', margin:'10px' }}>
          <Card.Body>
            <Card.Title>The Wine Drinkers</Card.Title>
            <Card.Text>
              <Row> <u>Axel Cabernet Sauvignon</u> - A favourit for many, that's why I'm famous.</Row>
              <Row> <u>Ivy Chardonnay </u>- You just can't stop loving me.</Row>
              <Row> <u>Clara Riesling</u> - Because just like the grape, I'm perfection!</Row>
              <Row> <u>Timmie Pinot Noir</u> - I'm perfect to bring at every occation. The wine too!</Row>
              <Row> <u>Rafsan Sauvignon Blanc</u> - When you want something fresh in life!</Row>
              <Row> <u>Pakorn Nebbiolo </u>- Two words, strong and powerful. Women loves it.</Row>
              <Row> <u>Moa Zinfandel</u> - Either you love me or you hate me</Row>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '35rem', backgroundColor: '#F3E7DA', margin:'10px' }}>
          <Card.Body>
            <Card.Title>  But... How Did It Start?</Card.Title>
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