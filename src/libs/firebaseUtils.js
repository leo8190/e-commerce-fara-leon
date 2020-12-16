import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from '../firebase/index';
import { Redirect } from "react-router-dom";
import { AppContext } from "../context/CartContext";
import { useContext } from "react";

const db = getFirestore();
const orders = db.collection("orders");

let userInfo = {
    name: "Leon Grand",
    phone: 1167348967,
    email: "leongrand@gmail.com",
};

// let item1 = {
//     id: 1,
//     title: "Vela Sendero de Luz",
//     price: 560,
// }

// let item2 = {
//     id: 2,
//     title: "Cuenco Batik",
//     price: 800,
// }

// cart.push(item1);
// cart.push(item2);

export const BuyProducts = (cart) => {
// export default function BuyProducts() {
    
    // console.log("BuyProducts()");

    // CALCULO EL PRECIO TOTAL DE TODOS LOS PRODUCTOS EN EL CARRITO
    const price = () => {
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++){
            for (let j = 0; j < cart[i].quantity; j++){
                totalPrice = totalPrice + cart[i].price;
            }
        }
        return totalPrice;
    }
    
    // PREPARO LA ORDEN PARA LUEGO ENVIARLA A LA BBDD
    const newOrder = {
        buyer: userInfo,
        items: cart,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        total: price(),
    };
        
    const actualizarStock = (item) => {        
        // actualizar el stock de un producto al generar una orden
        let docToUpdate = db.collection('products').where("id", "==", item.id);               
        docToUpdate.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log("doc.id");
                console.log(doc.id);
                db.collection('products').doc(doc.id).update({
                    stock: doc.get("stock") - item.quantity
                });   
            });
        })                   
    }
    
    for (let i = 0; i < cart.length; i++){
        actualizarStock(cart[i]);
    }

    // ENVIO LA ORDEN A LA BBDD
    orders.add(newOrder).then(({ id }) => {
        // setOrderId(id); // SUCCESS                    
        alert("¡Tu compra fue realizada con exito! El codigo de tu orden es: " + id);        
        window.location = "/";
    }).catch(err => {
        // setError(err); // ERROR
    }).finally(() => {
        //setLoading(false);                
    });      
}    



