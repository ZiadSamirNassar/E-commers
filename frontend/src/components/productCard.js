import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router";
import "../css/ProductCard.css";

const ProductCard = () => {
    return(
        <div className="card">

            <Card >
                <Card.Img className="card-img" variant="top" src="https://picsum.photos/200/300" />
                <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Link className="btn btn-dark w-100" to={"/5"}>Show More</Link>
                </Card.Body>
            </Card>

        </div>
    );
};

export default ProductCard;