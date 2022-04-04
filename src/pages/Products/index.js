/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { query, collection, onSnapshot, where } from "firebase/firestore";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import ProductList from "../../components/ProductList";
import { PRODUCTS } from "../../constants/firebase";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/use-auth-listener";
import { useProfile } from "../../hooks/use-profile-listener";

const Products = () => {
  const { profile, loading } = useProfile();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState("");

  React.useEffect(() => {
    if (profile) {
      setIsLoading(true);
      const queryForProduct =
        profile.userType == 0
          ? query(collection(db, PRODUCTS))
          : query(
              collection(db, PRODUCTS),
              where("createdBy", "==", user?.uid)
            );
      const unsubscribe = onSnapshot(queryForProduct, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });
        setProducts(cities);
        setIsLoading(false);
      });
      return unsubscribe;
    }
  }, [profile]);

  if (loading || isLoading) return <Loader />;

  return <ProductList products={products} />;
};

export default Products;
