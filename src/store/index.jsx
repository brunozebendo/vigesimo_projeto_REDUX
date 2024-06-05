/**esse componente é o index.js guardado no store, ele vai guardar o resumo de todos
 * os slices, para isso foi importada a função configureStore. A variável store foi então
 * passada no index.js (o principal) como um props, assim:
 * <Provider store={store}>
    <App />
  </Provider>
  Desta forma, todos os componente terão acesso aos reducers que estão dentro do store. Sendo Provider 
  uma função do react-redux.
 */
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
