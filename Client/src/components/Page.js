import React, { useEffect, useState } from "react";
import {  Button, Card, Form } from "react-bootstrap";
import {  FaHandSparkles } from "react-icons/fa";
import Navigationbar from "./Navigationbar";
import axios from "axios";
import CardDemo from "./CardDemo";


const Page = () => {

  const [circle, setCircle] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const id=localStorage.getItem("userId");
    console.log(JSON.parse(id));
    data(JSON.parse(id))
  }, [])
  
 
const data=async(id)=>{
  console.log(id);
  const response= await axios.post("http://localhost:3001/app/getPostSectionFullDetails",{user_id:id})
  console.log(response);
  setCircle(response.data.circle_list)
  setPost(response.data.post_list)
}

const CircleData=async(circleId)=>{
  const id=localStorage.getItem("userId");
  console.log(JSON.parse(id));
  console.log(id);
  const response= await axios.post("http://localhost:3001/app/getPostSectionFullDetails",{user_id:id,circle_id:circleId})
  console.log(response);
  setPost(response.data.post_list)
}

const handleCirlceId=(id,title)=>{
  console.log(id,title);
  CircleData(id)
}
  
  return (
    <div>
    <Navigationbar />
      <Card className="formcard p-5">
        
        <Form method="POST">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <span className="d-flex ">        <FaHandSparkles /> <h2>Hello!</h2></span> 
        <br />
        
       <span className="d-flex">
        <Form.Control type="email" placeholder="Ask the community" />
        <Button>Post</Button>
        </span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <span><strong>All posts</strong></span>
      </Form.Group>
      <Form.Group>
      <div className="d-flex justify-content-between">
      {circle.map(val=>{
        console.log(val);
       return <Button variant="outline-secondary" key={val._id} onClick={()=>{handleCirlceId(val._id,val.title)}}>{val.title}</Button>
      } )}
      </div>
      </Form.Group>
    </Form>
    <br />
    <br />
    {post.map(val=><CardDemo value={val} />)}
     
    </Card>
       
          
    </div>
  );
};

export default Page;
