import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { productCategories } from "../../constants/dropDownOptions";
import { addProduct } from "../../services/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import Loader from "../Loader";
import { PRODUCTS } from "../../constants/firebase";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState("");
  const inputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      const productImageRef = ref(storage, `${PRODUCTS}/${productImage?.name}`);
      await uploadBytes(productImageRef, productImage).then(() => {
        getDownloadURL(productImageRef).then(async (downloadURL) => {
          const res = await addProduct({
            ...productData,
            productImage: downloadURL,
          });
          if (res) {
            setProductData({
              name: "",
              brand: "",
              category: "",
              price: "",
              description: "",
            });
          }
        });
      });
    }
    setIsLoading(false);
  };

  const handleImage = (e) => {
    e.target.files[0] && setProductImage(e.target.files[0]);
  };

  if (isLoading) return <Loader />;

  return (
    <Container className="w-100 d-flex justify-content-center align-items-center h-100">
      <Form
        className="w-25"
        noValidate
        validated={validated}
        onSubmit={handleAddProduct}
      >
        <h2 className="text-center">Add Product</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Product name"
            onChange={handleOnChange}
            value={productData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid product name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{
              resize: "none",
            }}
            type="text"
            name="description"
            placeholder="Enter Product Description"
            onChange={handleOnChange}
            value={productData.description}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid product description
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter Price"
            onChange={handleOnChange}
            value={productData.price}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid Price
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            placeholder="Enter Product brand"
            onChange={handleOnChange}
            value={productData.brand}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid brand name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleOnChange}
            name="category"
            value={productData.category}
          >
            {productCategories.map(({ value, label }, index) => (
              <option value={value} key={index}>
                {label}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please enter a valid product name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            ref={inputRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please upload photo
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
