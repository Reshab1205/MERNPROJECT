// <h4>Login Here!</h4>
//           <Card.Body>
//             <FloatingLabel
//               // controlId="floatingInput"
//               label={<FaEnvelope />}
//               className="mt-5 mb-4"
//             >
//               <Form.Control
//                 onChange={handleChange}
//                 name="email"
//                 type="email"
//                 placeholder="Enter Email"
//                 ref={email}
//                 title={"email"}

//               />
//               <span style={{ color: "red" }}>{error.email}</span>
//             </FloatingLabel>

//             <FloatingLabel
//               // controlId="floatingInput"
//               label={<FaLock />}
//               className="mb-4"
//             >
//               <Form.Control
//                 name="password"
//                 onChange={handleChange}
//                 type="password"
//                 placeholder="enter password"
//                 ref={password}
//               />
//               <span style={{ color: "red" }}>{error.password}</span>
//             </FloatingLabel>

//             <div className="d-flex justify-content-center">
//               <Button
//                 variant="primary"
//                 onClick={handleSubmit}
//                 title="loginBtn"

//               >
//                 {" "}
//                 Log In{" "}
//               </Button>
//               </div>
//           </Card.Body>