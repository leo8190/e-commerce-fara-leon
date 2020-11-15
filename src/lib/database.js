export default function getProductsFromDatabase() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000)
    });
}

const products = `
[{
    "id": 1,
    "name": "Cuenquitos Batik",
    "price" : 400,
    "stock": 3
  }, {
    "id": 2,
    "name": "La Unión",
    "price" : 600,
    "stock": 6
  }, {
    "id": 3,
    "name": "Cuenco y Mano",
    "price" : 700,
    "stock": 3
  }, {
    "id": 4,
    "name": "Vela Sendero de Luz",
    "price" : 250,
    "stock": 4
  }
]`