import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from '../firebase/index';

const db = getFirestore();
const orders = db.collection("orders");

//FINALIZO LA COMPRA
export const BuyProducts = (cart) => {
    
    //junto la info ingresada por el cliente
    let userInfo = {
        firstName: document.getElementById("nombre").value, 
        lastName: document.getElementById("apellido").value,
        phone: document.getElementById("telefono").value, 
        email: document.getElementById("e-mail").value, 
        emailConfirmation: document.getElementById("confirmacion-e-mail").value, 
    }

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
        state: 'generated',
    };
        
    const actualizarStock = (item) => {        
        console.log(item);
        // actualizar el stock de un producto al generar una orden
        let docToUpdate = db.collection('products').where("id", "==", item.id);               
        docToUpdate.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                db.collection('products').doc(doc.id).update({
                    stock: doc.get("stock") - item.quantity
                });   
            });
        })                   
    }
    
    for (let i = 0; i < cart.length; i++){
        console.log("cart");
        console.log(cart);
        actualizarStock(cart[i]);
    }

    // ENVIO LA ORDEN A LA BBDD
    orders.add(newOrder).then(({ id }) => {
        alert("¡Tu compra fue realizada con exito! El codigo de tu orden es: " + id);        
        window.location = "/";
    }).catch(err => {
    }).finally(() => {
    });      
}    



