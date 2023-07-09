import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Aes = () => {
    const [keySize, setKeySize] = useState('');
    const [key, setKey] = useState('');
    const [plaintext, setPlaintext] = useState('');
    const [ciphertext, setCiphertext] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleKeySizeChange = (e) => {
        setKeySize(parseInt(e.target.value));
    };

    const handleKeyChange = (e) => {
        setKey(e.target.value);
    };

    const handlePlaintextChange = (e) => {
        setPlaintext(e.target.value);
    };

    const encrypt = () => {
        if (key.length * 8 !== keySize) {
            alert('La clave no tiene el tamaño correcto');
            return;
        }

        const encrypted = CryptoJS.AES.encrypt(plaintext, key);
        setCiphertext(encrypted.toString());
    };

    const decrypt = () => {
        if (key.length * 8 !== keySize) {
            alert('La clave no tiene el tamaño correcto');
            return;
        }

        const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        setDecryptedText(decryptedText);
    };

    const limpiarCampos = () => {
        setKey('');
        setKeySize('');
        setPlaintext('');
        setDecryptedText('');
        setCiphertext('');
    };

    return (
        <div>
            <div className="m-4 font-semibold">
                <h1 className="text-5xl">AES</h1>
                <p className="text-xl">Advanced Encryption Standard</p>
            </div>
            <div className="m-4 flex justify-between items-center">
                <textarea
                    type="text"
                    placeholder="Mensaje"
                    className="input input-bordered w-60"
                    id="plaintext"
                    value={plaintext}
                    onChange={handlePlaintextChange}
                />
                <button className="btn btn-ghost mask mask-squircle justify-end" onClick={limpiarCampos}>
                    <i className="fa-solid fa-broom fa-xl"></i>
                </button>
            </div>
            <textarea
                type="text"
                placeholder="Clave"
                className="m-4 input input-bordered w-60"
                id="key"
                value={key}
                onChange={handleKeyChange}
            />
            <div className="m-4 flex justify-between items-center">
                <select
                    className="select select-bordered w-60"
                    id="keySize"
                    value={keySize}
                    onChange={handleKeySizeChange}
                >
                    <option defaultValue="">Tamaño de Clave</option>
                    <option value={128}>128 bits - Clave de 16 caracteres</option>
                    <option value={192}>192 bits - Clave de 24 caracteres</option>
                    <option value={256}>256 bits - Clave de 32 caracteres</option>
                </select>
                <button className="btn btn-ghost justify-end" onClick={encrypt}>
                    Cifrar
                </button>
            </div>
            <p className="m-4 text-xl font-semibold">Cifrado:</p>
            <div className="m-4 flex justify-between items-center">
                <textarea
                    type="text"
                    placeholder={ciphertext}
                    className="input input-bordered w-60"
                    disabled
                />
                <button className="btn btn-ghost ml-2 justify-end" onClick={decrypt}>
                    Descifrar
                </button>
            </div>
            <p className="m-4 text-xl font-semibold">Descifrado:</p>
            <textarea
                type="text"
                placeholder=""
                className="m-4 input input-bordered w-60"
                value={decryptedText}
                disabled
            />
        </div>
    );
};

export default Aes;
