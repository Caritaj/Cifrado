import React, { useState } from 'react';

function CesarVigenere() {
    const [state, setState] = useState({
        mensaje: '',
        clave: '',
        tipoCifrado: '',
        resultadoCifrado: '',
        resultadoDescifrado: '',
    });

    const cifrarCesar = (mensaje, clave) => {
        let textoCifrado = '';
        const claveStr = String(clave);
        const claveLength = claveStr.length;

        for (let i = 0; i < mensaje.length; i++) {
            let char = mensaje[i];

            if (char.match(/[a-z]/i)) {
                let code = mensaje.charCodeAt(i);
                let claveChar = claveStr[i % claveLength].toLowerCase();
                let desplazamiento = claveChar.charCodeAt(0) - 97;

                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 + desplazamiento) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 + desplazamiento) % 26) + 97);
                }
            }

            textoCifrado += char;
        }

        return textoCifrado;
    };

    const descifrarCesar = (mensaje, desplazamiento) => {
        return cifrarCesar(mensaje, 26 - (desplazamiento % 26));
    };

    const cifrarVigenere = (mensaje, clave) => {
        let textoCifrado = '';
        let claveIndex = 0;

        for (let i = 0; i < mensaje.length; i++) {
            let char = mensaje[i];

            if (char.match(/[a-z]/i)) {
                let code = mensaje.charCodeAt(i);
                let claveChar = clave.charCodeAt(claveIndex % clave.length);
                let desplazamiento;

                if (claveChar >= 65 && claveChar <= 90) {
                    desplazamiento = claveChar - 65;
                } else if (claveChar >= 97 && claveChar <= 122) {
                    desplazamiento = claveChar - 97;
                } else if (claveChar >= 48 && claveChar <= 57) {
                    desplazamiento = claveChar - 48;
                }

                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 + desplazamiento) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 + desplazamiento) % 26) + 97);
                }

                claveIndex++;
            }

            textoCifrado += char;
        }

        return textoCifrado;
    };


    const descifrarVigenere = (mensaje, clave) => {
        let textoDescifrado = '';
        let claveIndex = 0;

        for (let i = 0; i < mensaje.length; i++) {
            let char = mensaje[i];

            if (char.match(/[a-z]/i)) {
                let code = mensaje.charCodeAt(i);
                let claveChar = clave.charCodeAt(claveIndex % clave.length);
                let desplazamiento;

                if (claveChar >= 65 && claveChar <= 90) {
                    desplazamiento = claveChar - 65;
                } else if (claveChar >= 97 && claveChar <= 122) {
                    desplazamiento = claveChar - 97;
                } else if (claveChar >= 48 && claveChar <= 57) {
                    desplazamiento = claveChar - 48;
                }

                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 - desplazamiento + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 - desplazamiento + 26) % 26) + 97);
                }

                claveIndex++;
            }

            textoDescifrado += char;
        }

        return textoDescifrado;
    };


    const handleChange = (e) => {
        setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };

    const cifrar = () => {
        const { mensaje, clave, tipoCifrado } = state;

        let resultadoCifrado = '';

        if (tipoCifrado === 'cesar') {
            const desplazamiento = parseInt(clave);
            resultadoCifrado = cifrarCesar(mensaje, desplazamiento);
        } else if (tipoCifrado === 'vigenere') {
            resultadoCifrado = cifrarVigenere(mensaje, clave);
        }

        setState({ ...state, resultadoCifrado, resultadoDescifrado });
    };

    const descifrar = () => {
        const { resultadoCifrado, clave, tipoCifrado } = state;

        let resultadoDescifrado = '';

        if (tipoCifrado === 'cesar') {
            const desplazamiento = parseInt(clave);
            resultadoDescifrado = descifrarCesar(resultadoCifrado, desplazamiento);
        } else if (tipoCifrado === 'vigenere') {
            resultadoDescifrado = descifrarVigenere(resultadoCifrado, clave);
        }

        setState({ ...state, resultadoDescifrado });
    };

    const { mensaje, clave, tipoCifrado, resultadoCifrado, resultadoDescifrado } = state;

    const limpiarCampos = () => {
        setState({
            mensaje: '',
            clave: '',
            tipoCifrado: '',
            resultadoCifrado: '',
            resultadoDescifrado: '',
        });
    };

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(https://globalendar.com/wp-content/uploads/2023/03/fondos-de-pantalla-aesthetic-blanco-2-scaled.jpg)" }}>
            <div className="hero-content text-left">
                <div className="max-w-md">
                    <h1 className="m-4 text-5xl font-bold">Servicio de Cifrado</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Mensaje"
                            className="m-4 input input-bordered w-full max-w-xs"
                            id="mensaje"
                            value={mensaje}
                            onChange={handleChange}
                        />
                        <button className="btn btn-ghost mask mask-squircle" onClick={limpiarCampos}>
                            <i className="fa-solid fa-broom fa-xl"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Clave"
                        className="m-4 input input-bordered w-full max-w-xs"
                        id="clave"
                        value={clave}
                        onChange={handleChange}
                    />
                    <div>
                        <select
                            className="m-4 select select-bordered w-full max-w-xs"
                            id="tipoCifrado"
                            value={tipoCifrado}
                            onChange={handleChange}
                        >
                            <option defaultValue="">Tipo de Cifrado</option>
                            <option value="cesar">Cifrado César</option>
                            <option value="vigenere">Cifrado Vigenère</option>
                        </select>
                        <button className="btn btn-ghost" onClick={cifrar}>
                            Cifrar
                        </button>
                    </div>
                    <p className="m-4 text-xl font-semibold">Cifrado:</p>
                    <div className="flex">
                        <textarea type="text" placeholder={resultadoCifrado} className="input input-bordered w-full max-w-xs mr-2" disabled />
                        <button className="btn btn-ghost ml-2" onClick={descifrar}>
                            Descifrar
                        </button>
                    </div>
                    <p className="m-4 text-xl font-semibold">Descifrado:</p>
                    <textarea type="text" placeholder={resultadoDescifrado} className="input input-bordered w-full max-w-xs" disabled />
                </div>
            </div>
        </div>
    );
}

export default CesarVigenere;
