import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const PageNotFound = () => (
  <div className="mydiv">
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default PageNotFound;