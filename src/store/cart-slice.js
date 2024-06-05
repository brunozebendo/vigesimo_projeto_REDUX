/**esse componente vai criar o slice de um cart, para isso é importada a função createSlice,
 * são setados os estados iniciais e criada a função reducer.
 */
/**na aula 319 é inserido o código para corrigir o problema de que o carrinho é atualizado
 * toda vez que a página recarrega, enquanto o correto é ele só atualizar quando
 * for incluído ou excluído algo do carro, o que afeta o database. Para isso, inicialmente
 * foi incluído o changed: false no initialstate, depois nas funções de add e remove
 * foi incluída uma linha o tornando true e no App.jsx foi incluída essa linha:
 * if(cart.changed) {
    dispatch(sendCartData(cart))
    }
  }, [cart, dispatch]);

  Portanto, se for true vai disparar a função
 */
import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false
  },
  /**essa função reducer vai controlar a inclusão de novos itens no carrinho de compras
   * então é necessário inclui também uma action e um payload (para carregar os dados).
   * No começo é checado se o tem já existe, caso não existe ele é incluído (push), caso exista
   * é acrescentado mais um e atualizado o preço e em seguida a lógica para remover um item se só
   * se tiver ou se houver mais e depois os dois exports necessários, do slice e do reducer.
   */
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
