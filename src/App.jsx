/**Componente App.js e esse é o código da seção 20 e ainda é um estudo sobre Redux, não consegui baixar, então
 * farei no CondeSandbox. O código vai ser de um site com um botão de MyCart q vai mostrar ou não
 * uma caixa mais abaixo, nesse caixa tem botão de + ou - e mais abaixo uma outra caixa com um botão
 * de Add to Cart. A intenção é fazer todos funcionarem usando Redux. Primeiro foi criado uma pasta
 * store e guardados o index.js, e dois slices para guardar a lógica de compartilhamento de cada
 * componente
 */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
/**essa variável foi acrescentada pois já na primeira renderização era feito um
 * request e alterado o database, por isso ela foi declarada fora do escopo da função
 * e no final dela é acrescentado um if para caso ela seja true, ela passa a ser false
 * e dá um return, não executando o resto da função.
 */
let isInitial = true;
/**Aqui foi importada a função useSelector para selecionar o state que está dentro
 * do store ui e dentro do slice cartIsVisible e guardado em uma variável, abaixo usada
 * para mostrar condicionalmente o Cart, a mesma lógica é usada para o notification
 */
function App() {
  const dispatch = useDispatch;
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
/**Aqui é criado um novo useEffect para chamar a função que vai buscar os dados
 * no database, criada no cart-actions
 */
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])
  
  
  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    //explicação no cart-slice
  if(cart.changed) {
    dispatch(sendCartData(cart))
    }
  }, [cart, dispatch]);

   

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
