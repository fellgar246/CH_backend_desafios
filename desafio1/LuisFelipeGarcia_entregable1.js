class ProductManager {
    constructor(){
        this.products = []

    }

    addProduct = ( title, description, price, thumbnail, code, stock ) => {
        // agregará un producto al arreglo de productos inicial.
        // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
        // Al agregarlo, debe crearse con un id autoincrementable
        if( !title || !description || !price || !thumbnail || !code || !stock ) return "Todos los campos son obligatorios";

        const productDuplicated = this.products.find( product => product.code === code )
        if(productDuplicated) return "Producto con código duplicado, ingrse uno nuevo por favor" ;       

        const product = {
            title: title, 
            description: description, 
            price: price, 
            thumbnail: thumbnail, 
            code: code,
            stock: stock
        }
        if(this.products.length === 0){
            product.id = 1
        } else{
            product.id = this.products[this.products.length-1].id+1;
        }
        this.products.push(product)
        return product
    }

    getProducts = () => {
        // devolver el arreglo con todos los productos creados hasta ese momento
        return this.products
    }

    getProductById = (id) => {
        // buscar en el arreglo el producto que coincida con el id
        // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
        const product = this.products.find( product => product.id  === id )
        if(!product) return console.log("Not found");
        return product
    }

    
}

//EJEMPLOS DE PRUEBA:

// const productoDePrueba = new ProductManager();

// productoDePrueba.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)
// productoDePrueba.addProduct("jeans", "ropa de hombre", 799, "sin imagen", "abc124", 12)
// productoDePrueba.addProduct("blusa", "ropa de mujer", 599, "sin imagen", "abc125", 12)
// productoDePrueba.addProduct("vestido", "ropa de mujer", 599, "sin imagen", "abc126", 12)

// console.log(productoDePrueba.getProducts());
// console.log(productoDePrueba.getProductById(3));
