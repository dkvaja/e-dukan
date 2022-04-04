import React from "react";
import { Row } from "react-bootstrap";
import Product from "../Product";

const ProductList = ({ products = "" }) => {
  return (
    <Row xs={1} md={4} className="g-4">
      {products &&
        products.length > 0 &&
        products.map((product) => <Product {...product} key={product.id} />)}
    </Row>
  );
};

export default ProductList;
