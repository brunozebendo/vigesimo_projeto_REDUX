/**esse componente ui-slice, guarda a lógica do botão no header que vai mostrar ou não
 * o cart abaixo. Reparar que o createSlice é uma função do toolkit para criar um slice
 * e que isso garante que o state criado mais abaixo não seja modificado diretamente
 * mas seja criada uma função interna.
 */
/**Na aula 316 é inserida a lógica para a notification que é uma barra no header
 * que mudar de cor conforme o resultado do request do http, para isso foi aproveitado
 * esse slice para controle do estado ao invés de se criar um useState, por exemplo. O 
 * estado inicial foi setado para null e mais abaixo foi setado o action do notification
 * ou seja, os atributos que ele deve levar
 */
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsvisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
