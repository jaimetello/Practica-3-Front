import React, { FC, useState, useEffect } from "react"
import './Peliculas.css'

const Peliculas: FC = () => { //Todo el codigo entre el 3  y return
    let [nombre, setNombre] = useState<string>("");
    let [url, setUrl] = useState<string>("http://swapi.dev/api/people/?search=&page=1");
    let [personajes, setPersonajes] = useState<any>({ next: 1 })
    let [personajes2, setPersonajes2] = useState<any>({})
    let [clave, setKey] = useState<number>(0)
    let[visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        buscarPersonaje(url);
    }, [url])
    async function buscarPersonaje(direccion: string) {
        let response = await fetch(direccion) //Conexion y esperas
        let dato = await response.json(); //Traes resultados de la API y no avanzas hasta terminar
        setPersonajes(dato)
        setKey(0)
        console.log(dato.results[clave].name)

    }


    return (
        <div id="pantalla">
            <div id="buscador">
                <input id="personaje" placeholder="Introduce personaje" onChange={(e) => { setNombre(e.target.value) }}></input>
                <button id="buscar" onClick={() => { setUrl(`http://swapi.dev/api/people/?search=${nombre}&page=1`) }}> <b>BUSCAR</b></button>
                {personajes.next && <button id="Siguiente" onClick={() => { setUrl(personajes.next) }}> <b>NEXT</b></button>}
                {personajes.previous && <button id="Anterior" onClick={() => { setUrl(personajes.previous) }}><b>PREV</b></button>}
            </div>
            <div id="datos">

                <div id="lista">
                    {personajes !== undefined && personajes?.results?.map((e: any, k: number) => (
                        <div onClick={() => { setKey(k); setVisible(true)}}>
                            {e.name}
                        </div>
                    ))}
                </div>
                {visible &&<div id="mostrar">
                    {personajes!==undefined && <div>NOMBRE: {personajes?.results[clave]?.name}</div>} 
                    {personajes!==undefined && <div>ALTURA: {personajes?.results[clave]?.height} CM</div>}
                    {personajes!==undefined && <div>PESO: {personajes?.results[clave]?.mass} KG</div>}
                    {personajes!==undefined && <div>COLOR DE PELO: {personajes?.results[clave]?.hair_color}</div>}
                    {personajes!==undefined && <div>COLOR DE PIEL: {personajes?.results[clave]?.skin_color}</div>}
                    {personajes!==undefined && <div>COLOR DE OJOS: {personajes?.results[clave]?.eye_color}</div>}
                    {personajes!==undefined && <div>AÑO DE NACIMINETO: {personajes?.results[clave]?.birth_year}</div>}
                    {personajes!==undefined && <div>GENERO: {personajes?.results[clave]?.gender}</div>}


                </div>}

            </div>
        </div>
    )
}

export default Peliculas