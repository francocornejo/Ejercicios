const fs = require('fs')

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
        /* fs.promises.writeFile(`./${nombreArchivo}`, '') */
        
    }
    async save(obj){
        let dato = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
    
        if(!dato){
            const  id = 1
            const arr = [obj]
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(arr))
            return obj.id
        }else{
            dato = JSON.parse(dato)
            obj.id = dato.length +1
            dato.push(obj)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(dato))
            return obj.id
        }
    }
    async getById(number){
        try{
            let dato = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            dato = JSON.parse(dato)
            dato = dato.find( res => res.id === number)
            return dato ? console.log(dato) : null
        }catch{
            console.log('entre al catch')
        }
        
    }

    async getAll(){
        try{
            let dato = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            dato = JSON.parse(dato)
            console.log(dato)
            return dato
        }catch{
            console.log('No existen archivos para mostrar')
        }
    }

    async deleteById(id){
        try{
            let dato = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            dato = JSON.parse(dato);
            dato = dato.filter(red => red.id !== id)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(dato))
            console.log(dato)
        }catch{
            console.log("No se logro borrar el archivo")
        }
    }
    async elementoAzar (){
        try{
            let data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            data = JSON.parse(data)
            const ProductRa = data[Math.floor(Math.random() * data.length)]

            return ProductRa
    
        } catch{
            console.log("El archivo no se puede leer")
        }
    }

    async deleteAll(){
        await fs.promises.unlink(`./${this.nombreArchivo}`, err =>{
            if(err){
                console.log('No se logro borrar el archivo')
            }else{
                console.log('El archivo se borro correctamente')
            }
        })
    }
}

const produ1 = {
    id: 1,
    tittle: "Teclado Logitech G213 Prodigy RGB",
    thumbnail: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_12000_Teclado_Logitech_G213_Prodigy_RGB_Ingl__s_d2a6c763-grn.jpg",
    price: 6030,
}

const produ2 = {
    id: 2,
    tittle: "Teclado Mecanico HP HyperX Alloy Origins Core Aqua",
    thumbnail: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_19662_Teclado_Mecanico_HP_HyperX_Alloy_Origins_Core_Aqua_US_cf25412b-grn.jpg",
    price: 8640,
}

const produ3 = {
    id: 3,
    tittle: "Teclado Mecanico Glorious GMMK TKL RGB",
    thumbnail: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31342_Teclado_Mecanico_Glorious_GMMK_TKL_RGB__Pre-Built__White_eae5cc79-grn.jpg",
    price: 14490,
}

const Product = new Contenedor('/productos.txt')

const express = require('express')
const app = express()
const puerto = 8080

app.get('/productos', controlProd)

app.get('/productosRandom', ProductRan)

app.listen(puerto, () => {
    console.log(`Servidor escuchando puerto ${puerto}`)
})

async function controlProd(req,res) {
    const response = await Product.getAll()
    
    res.send(response)
} 

async function ProductRan (req,res) {
    const response = await Product.elementoAzar()
    
    res.send(response)
    console.log(response)
} 