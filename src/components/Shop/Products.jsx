/**Nesse componente (Product.js) é criada a lógica para exibir os produtos na tela com base
 * na estrutura estabelecida no componente ProductItem, que, por sua vez, usa a lógica compartilhada
 por Redux no cart-slice
 */
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first Book",
    description: " The first book I ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My second Book",
    description: " The 2nd book I ever wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
