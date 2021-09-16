import React from "react";
import {Nav, Col, Row} from 'react-bootstrap';


function NavbarPage () {
    return (
      


            <Col >
                <Row  className="justify-content-md-center">
            
          <Nav variant="tabs" defaultActiveKey="/App" style={{ padding: "40px" }} >

          <h2 style={{ color: "#bf8596" }}>MENU</h2>

          <Nav.Item>
               
               <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                   Red Wine
               </Nav.Link>
           
             </Nav.Item>

             <Nav.Item>
               
               <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                   White Wine
               </Nav.Link>
           
             </Nav.Item>

             <Nav.Item>
               
               <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                   Bubbles
               </Nav.Link>
           
             </Nav.Item>
          
         </Nav>
         </Row> 
           
         </Col>

        


       
    )

}



export default NavbarPage;
