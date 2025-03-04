import React from "react";
import ProductCard from "../../components/productCard";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const Home = () => {
    return(
        <div className="Home-ontainer p-5">

           <Stack className="pb-5" direction="horizontal" gap={3}>
                <Form.Control className="me-auto" placeholder="Search item here..." />
                <Button className="btn btn-dark">Submit</Button>
            </Stack>

            <div className="row">
                <div className="col-3 card-product-container">
                    <ProductCard/>
                </div>
                <div className="col-3 card-product-container">
                    <ProductCard/>
                </div>
                <div className="col-3 card-product-container">
                    <ProductCard/>
                </div>
                <div className="col-3 card-product-container">
                    <ProductCard/>
                </div>
            </div>
        </div>
    );
};

export default Home;