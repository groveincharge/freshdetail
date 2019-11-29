import React from 'react';

const ProductList = (props) => {
      console.log(props);
    return <div>Product: {props.name} | Price: {props.price}</div>
}

export default ProductList;