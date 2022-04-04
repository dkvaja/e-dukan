import React from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { productCategories } from "../../constants/dropDownOptions";

const Product = ({
  name,
  description,
  price,
  productImage,
  brand,
  category,
}) => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={productImage} />
        <Card.Body>
          <Card.Title>
            {name}
            <Badge bg="secondary" className="m-1">
              {productCategories.find((p) => p.value === category)?.label}
            </Badge>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
