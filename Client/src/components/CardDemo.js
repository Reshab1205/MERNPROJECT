import React from 'react'
import {  Card, Col, Row } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa";
import {  SiSquarespace } from "react-icons/si";
import { BsFillBookmarkFill, BsShare } from 'react-icons/bs';


const CardDemo = (props) => {

    const{comments_count,content,likes_count,_id}=props.value;


  return (
    <div>
    <Card key={_id}>
   
    <Card.Text>
    <Row>
    <Col xs={10} sm={10} md={10}>
   {content}
    </Col>
   <Col xs={1} sm={1} md={1}>
   <span className=""><BsFillBookmarkFill /></span>
   </Col>
    </Row>
    </Card.Text>
    
    <br />
    <span className="d-flex justify-content-between">
    <Card.Link className="mx-3 " href="#"> <FaHandshake /> {likes_count} Supporters</Card.Link>
    
    <Card.Link href="#"> <SiSquarespace/> {comments_count} Responses</Card.Link>
    <Card.Link className="mx-5 " href="#"> <BsShare />  </Card.Link>
  
    </span>
    
    </Card>
    </div>
  )
}

export default CardDemo