import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>
                Welcome to FoodFinder!
            </h1>
            <Link to='/find'><button>Enter</button></Link>
        </div>
    )

}

export default Home;
