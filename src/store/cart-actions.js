import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

/**Na aula 318 é criado esse componente para guardar a lógica das actions que
 * antes estava no ui-slice, ou seja, aqui estão as funções de envio e recebimento
 * da lógica do carrinho.
 * Ainda na mesma aula é incluída a função fetchCartData para atingir 'fetch' a informação
 * no banco de dados assim q o código carregue
 */

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('espaco para o mesmo link da API que o PUT');

            if (!response.ok) {
                throw new Error('Could not fetch cart data')
            }
            const data = await response.json();

            return data;
        };
/**aqui o código vai tentar pegar os dados que estão no database  usando o reducer
 * replaceCart criado cart-slice para trazer os dados que nesse caso já estão no formato
 * correto pois foram incluídos lá pelo PUT. Depois o código foi atualizado para
 * garantir que os itens do carrinho sejam mantidos, se houver, ou || que seja um
 * array vazio se não houver, é preciso essa garantia para não da undefined se não
 * houver itens no database.
  */
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));            
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error...",
                  message: "Fetching cart data failed!",
                })
              );
        }
    }
}


/**Na aula 316 e 317 é inserido o componente notification que se aproveita do ui-slice
   * para compartilhar o seu state e payload entre os componentes, como aqui,  onde ele
   * vai ser mostrado de modos diferentes de acordo com o ciclo e a resposta do fetch  */
/**A função para se comunicar com a API, que deveria ser um banco de dados no Firebase que não está funcionando,
 * foi alocada inicialmente em um useEffect no App.js, mas depois foi transferida para cá,
 * mostrando assim as duas opções. Desta forma, o carrinho é atualizado pelo reducer e
 * quando ele o for, é chamado o useEffect (no App.js) para mandar os dados para o database.
 * Aqui foi usado o método PUT para sobrepor o que já estiver no database.
   */

/**essa função sendCartData chama outras funções, no caso, a sendRequest que é a 
 * função que vai controlar o envio das informações e os possíveis erros, e no App ela é
 * chamada assim 
 * useEffect(() => {    
    dispatch(sendCartData(cart))
  }, [cart, dispatch]);
 */
  export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
  
      const sendRequest = async () => {
        const response = await fetch("espaço para o link de um endereço de uma API Database", {
          method: "PUT",
          body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
        });
        if (!response.ok) {
          throw new Error("Sending cart data failed");
        }
      };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed!",
        })
      );
  
    }      
    }};