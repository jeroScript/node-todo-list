

const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err)=> {
        if(err) throw new Error('No se pudo grabar',err)
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer =  require('./db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer
}

const actualizar = (desc, comp) => {
    cargarDB();

    let tarea = listadoPorHacer.findIndex( x => x.descripcion === desc)
    
    if(tarea != -1) {
        listadoPorHacer[tarea].completado = comp;
        guardarDB()
        return true
    } else {
        return false
    }
}

const borrar = (desc) => {
    cargarDB(); 
    let listado = listadoPorHacer.filter( x => x.descripcion != desc);
    if (listado.length == listadoPorHacer.length){
        return false
    } else {
        listadoPorHacer = listado;
        guardarDB();
        return true
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}