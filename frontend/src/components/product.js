import React, {useState} from 'react';


const Product = () => {
    
const [product, setProduct] = useState({
  name: " ",
  price: " ",
  productImage: " "
});

 const handleChange = (event) => {
    event.persist();
    setProduct(product => ({...product, [event.target.name]: event.target.value}));
  };

  const handleSubmit = (event) => {
    alert('Your product was submitted: ' + product.name);
    event.preventDefault();

     fetch('/api/product',{
                 method: 'POST',
                 headers: {
                    'Accept': 'text/plain, */*',
                    'Content-Length': File.length,
                    'Content-Type': 'multipart-formdata'
                          },
                   body: product
    })
    .then(item => {
      this.setProduct({
          name: " ",
          price: " ",
          productImage: " "
      });
    })
    .catch(err => console.log(err)); 
  };

  return ( 
       <div>
         <form method="POST" action="/api/product" enctype="multipart/form-data">
         <>
            name:
            <input type="text" name="name" value={product.name} 
            onChange={handleChange} required/>
          </><br/>

          <><br/>
            price:
            <input type="text" name="price" value={product.price} 
            onChange={handleChange} required/>
          </><br/>

           <><br/>
           productImage:
            <input type="file" name="productImage" 
            onChange={handleChange} required />
           </><br/>
           <input type="submit" value="Submit" />
         </form>
       </div>
   );
}
 
export default Product;