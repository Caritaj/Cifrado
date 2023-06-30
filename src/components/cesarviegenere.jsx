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
        let claveIndex = 0;

        for (let i = 0; i < mensaje.length; i++) {
            let char = mensaje[i];
            let code = mensaje.charCodeAt(i);
            let desplazamiento;

            if (char.match(/[a-z]/i)) {
                let claveChar = claveStr[claveIndex % claveLength];

                if (claveChar.match(/[a-z]/i)) {
                    desplazamiento = claveChar.toLowerCase().charCodeAt(0) - 97;
                } else if (claveChar.match(/[0-9]/)) {
                    desplazamiento = claveChar.charCodeAt(0) - 48;
                } else if (claveChar === ' ') {
                    textoCifrado += char;
                    continue; // Pasar al siguiente carácter del mensaje
                } else {
                    // Carácter inválido en la clave, se omite
                    claveIndex++;
                    continue; // Pasar al siguiente carácter del mensaje
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

    const descifrarCesar = (mensaje, clave) => {
        let textoDescifrado = '';
        const claveStr = String(clave);
        const claveLength = claveStr.length;
        let claveIndex = 0;

        for (let i = 0; i < mensaje.length; i++) {
            let char = mensaje[i];
            let code = mensaje.charCodeAt(i);
            let desplazamiento;

            if (char.match(/[a-z]/i)) {
                let claveChar = claveStr[claveIndex % claveLength];

                if (claveChar.match(/[a-z]/i)) {
                    desplazamiento = claveChar.toLowerCase().charCodeAt(0) - 97;

                    if (code >= 65 && code <= 90) {
                        char = String.fromCharCode(((code - 65 - desplazamiento + 26) % 26) + 65);
                    } else if (code >= 97 && code <= 122) {
                        char = String.fromCharCode(((code - 97 - desplazamiento + 26) % 26) + 97);
                    }
                } else if (claveChar.match(/[0-9]/)) {
                    desplazamiento = parseInt(claveChar) % 26;

                    if (code >= 65 && code <= 90) {
                        char = String.fromCharCode(((code - 65 - desplazamiento + 26) % 26) + 65);
                    } else if (code >= 97 && code <= 122) {
                        char = String.fromCharCode(((code - 97 - desplazamiento + 26) % 26) + 97);
                    }
                } else if (claveChar === ' ') {
                    textoDescifrado += char;
                    continue; // Pasar al siguiente carácter del mensaje
                } else {
                    // Carácter inválido en la clave, se omite
                    claveIndex++;
                    continue; // Pasar al siguiente carácter del mensaje
                }

                claveIndex++;
            }

            textoDescifrado += char;
        }

        return textoDescifrado;
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

                if (claveChar === 32) {
                    // Si el carácter de la clave es un espacio, se ignora y no se realiza desplazamiento
                    claveIndex++;
                    claveChar = clave.charCodeAt(claveIndex % clave.length);
                }

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

                if (claveChar === 32) {
                    // Si el carácter de la clave es un espacio, se ignora y no se realiza desplazamiento
                    claveIndex++;
                    claveChar = clave.charCodeAt(claveIndex % clave.length);
                }

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
        <div>
            <div className="m-4 font-semibold">
                <h1 className="text-5xl">Cifrar por...</h1>
                <p className="text-xl">César ó Viegenére</p>
            </div>
            <div className="m-4 flex justify-between items-center">
                <textarea
                    type="text"
                    placeholder="Mensaje"
                    className="input input-bordered w-60"
                    id="mensaje"
                    value={mensaje}
                    onChange={handleChange}
                />
                <button className="btn btn-ghost mask mask-squircle justify-end" onClick={limpiarCampos}>
                    <i className="fa-solid fa-broom fa-xl"></i>
                </button>
            </div>
            <textarea
                type="text"
                placeholder="Clave"
                className="m-4 input input-bordered w-60"
                id="clave"
                value={clave}
                onChange={handleChange}
            />
            <div className="m-4 flex justify-between items-center">
                <select
                    className="select select-bordered w-60"
                    id="tipoCifrado"
                    value={tipoCifrado}
                    onChange={handleChange}
                >
                    <option defaultValue="">Tipo de Cifrado</option>
                    <option value="cesar">Cifrado César</option>
                    <option value="vigenere">Cifrado Vigenére</option>
                </select>
                <button className="btn btn-ghost justify-end" onClick={cifrar}>
                    Cifrar
                </button>
            </div>
            <p className="m-4 text-xl font-semibold">Cifrado:</p>
            <div className="m-4 flex justify-between items-center">
                    <textarea 
                    type="text" 
                    placeholder={resultadoCifrado} 
                    className="input input-bordered w-60" 
                    disabled />
                    <button className="btn btn-ghost ml-2 justify-end" onClick={descifrar}>
                        Descifrar
                    </button>
            </div>
            <p className="m-4 text-xl font-semibold">Descifrado:</p>
            <textarea 
            type="text" 
            value={resultadoDescifrado} 
            className="m-4 input input-bordered w-60" 
            disabled />
        </div>
    );
}

export default CesarVigenere;
