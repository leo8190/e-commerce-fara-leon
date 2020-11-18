//trae todos los productos
export function getProductsFromDatabase() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000)
    });
}

//trae el producto cuyo ID ingresa por parametro
export function getProductFromDatabaseById(selectedId) {
  return new Promise((resolve) => {
      console.log("selectedId: " + selectedId);
      // const selectedProduct = products.find((d) => d.id === selectedId);
      //const selectedProduct = findById(products, selectedId);

      setTimeout(() => {
          const jsArrayProducts = JSON.parse(products);
          resolve(jsArrayProducts[selectedId - 1]);
      }, 3000)
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