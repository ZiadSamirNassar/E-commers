import React from "react";
import "../../css/ProductDetails.css";
import ReviewProduct from "../../components/ReviewProduct";


const ProductDetails = () => {
    return (
        <div className="ProductDetails-container p-5">
            <div className="row">
                <div className="col-3">
                    <img className="product-img" src="https://picsum.photos/200/300" alt="product img" />
                </div>

                <div className="col-9">
                    <h3>Product name</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <h4>Quantity : 12</h4>
                    <h4>Product : 1200</h4>
                </div>


            </div>

            {/* Reviu product list */}
            <div>
                <hr/>
                <h4 className="text-center bg-dark text-white p-2">Product Review</h4>
                <ReviewProduct />
                <ReviewProduct />
                <ReviewProduct />
            </div>
        </div>
    );
};

export default ProductDetails;