const fs = require('fs')

class ProductManager {
    constructor(){
        this.products = []
        this.path = './products.json';
    }

    getProducts = async() => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8');
            const products = JSON.parse(data);
            return products
        }
        return [];
    }


    addProduct = async( title, description, price, thumbnail, code, stock ) => {
        try {
            if( !title || !description || !price || !thumbnail || !code || !stock ) throw new Error ("Todos los campos son obligatorios");

            const products = await this.getProducts();

            const productDuplicated = products.find( product => product.code === code )
            if(productDuplicated) throw new Error("Producto con código duplicado, ingrese uno nuevo por favor") ;       

            const product = {
                title: title, 
                description: description, 
                price: price, 
                thumbnail: thumbnail, 
                code: code,
                stock: stock
            }
            if(products.length === 0){
                product.id = 1
            } else{
                product.id = products[products.length-1].id+1;
            }
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'));
            return product
        } catch (error) {
            return error.message
        }
        
    }

    getProductById = async(id) => {
        try {
            const products = await this.getProducts();
            const product = products.find( product => product.id  === id )
            if(!product) throw new Error("Not found");
            return product
        } catch (error) {
            return error.message
        }
       
    }

    //TODO
    // En cambio si envias un objeto {thumbnail: 'Nuevourl.com'}
    // Podes hacer lo siguiente  
    // const productToUpdate = { ...products[index], ...updatedFields };
    //ver caso de Rick&Morty

    updateProduct = async(id, title, description, price, thumbnail, code, stock) => {
        try {

            const products = await this.getProducts();
            const product = products.find( product => product.id  === id )   
          

            if(title) product.title = title;
            if(description) product.description = description;
            if(price) product.price= price;
            if(thumbnail) product.thumbnail =thumbnail;
            if(stock) product.stock= stock;
            if(code) {
                const duplicateCode = products.find( product => product.code  === code );
                if(duplicateCode) throw new Error("Modificacion de producto con código duplicado, ingreser por favor otro código ")
                else {
                    product.code= code
                }
            };
            
          
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'));
            return product
        } catch (error) {
            return error.message
        }
    }

    deleteProduct= async(id) => {
        try {

            const products = await this.getProducts();
            const product = products.find( product => product.id  === id )   
            if(!product) throw new Error("Not found");
            
            const productsFiltered = products.filter( product => product.id != id)
            
            await fs.promises.writeFile(this.path, JSON.stringify(productsFiltered,null,'\t'));
            return productsFiltered
        } catch (error) {
            return error.message
        }
    }

    
}

//EJEMPLOS DE PRUEBA:

// const productoDePrueba = new ProductManager();

// const context = async() => {
    // const agregarProducto1 = await productoDePrueba.addProduct(  "producto prueba","Este es un producto prueba", 200, "sin imagen", "abc123", 25);
    // console.log(agregarProducto1);
    // const agregarProducto2 = await productoDePrueba.addProduct("jeans", "ropa de hombre", 799, "sin imagen", "abc124", 12);
    // console.log(agregarProducto2);
    // const agregarProducto3 = await productoDePrueba.addProduct("blusa", "ropa de mujer", 599, "sin imagen", "abc125", 12);
    // console.log(agregarProducto3);
    // const agregarProducto4 = await productoDePrueba.addProduct("vestido", "ropa de mujer", 599, "sin imagen", "abc126", 12);
    // console.log(agregarProducto4);


    // const traerProductos = await productoDePrueba.getProducts();
    // console.log(traerProductos)
    
    // const productoPorId = await productoDePrueba.getProductById(1);
    // console.log(productoPorId)

    // const modificarProducto = await productoDePrueba.updateProduct(2, "", "ropa modificada", 200, "", "abc140", 20 )
    // console.log(modificarProducto);

    // const borarProducto = await productoDePrueba.deleteProduct(1)
    // console.log(borarProducto);
// }

// context();
