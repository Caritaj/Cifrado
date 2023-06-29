import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function Des() {
    const [file, setFile] = useState(null);
    const [key, setKey] = useState('');
    const [encryptedFile, setEncryptedFile] = useState(null);

    // Función para cifrar el archivo
    const encryptFile = () => {
        if (file && key.length === 8) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (fileExtension !== 'txt') {
                    alert('Por favor, selecciona un archivo de texto (.txt).');
                    return;
                }
                const encryptedContent = CryptoJS.DES.encrypt(fileContent, key).toString();
                const encryptedFileBlob = new Blob([encryptedContent], { type: 'text/plain' });
                setEncryptedFile(encryptedFileBlob);
                downloadFile(encryptedFileBlob, 'encrypted_file.txt', 'encrypt');
            };
            reader.readAsText(file);
        } else {
            alert('La clave debe tener una longitud de 8 caracteres.');
        }
    };

    // Función para descifrar el archivo
    const decryptFile = () => {
        if (encryptedFile && key.length === 8) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                const fileExtension = encryptedFile.name.split('.').pop().toLowerCase();
                if (fileExtension !== 'txt') {
                    alert('Por favor, selecciona un archivo de texto (.txt) cifrado.');
                    return;
                }
                const decryptedContent = CryptoJS.DES.decrypt(fileContent, key).toString(CryptoJS.enc.Utf8);
                const decryptedFileBlob = new Blob([decryptedContent], { type: 'text/plain' });
                downloadFile(decryptedFileBlob, 'decrypted_file.txt', 'decrypt');
            };
            reader.readAsText(encryptedFile);
        } else {
            alert('La clave debe tener una longitud de 8 caracteres.');
        }
    };

    // Función para descargar el archivo
    const downloadFile = (fileBlob, fileName, action) => {
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        if (action === 'encrypt') {
            setFile(null);
            setKey('');
        } else if (action === 'decrypt') {
            setEncryptedFile(null);
        }
    };

    return (
        <div className="hero-content text-left">
            <div className="max-w-md">
                <h1 className="m-4 text-3xl font-semibold">DES</h1>
                <input
                    type="text"
                    placeholder="Clave"
                    className="m-4 input input-bordered w-full max-w-xs"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <h1 className="m-4 text-xl font-semibold">Cifrar</h1>
                <div className="m-4 flex justify-between items-center">
                    <input type="file" accept=".txt" className="file-input file-input-bordered w-full max-w-xs" onChange={(e) => setFile(e.target.files[0])} />
                    <button className="btn btn-ghost" onClick={encryptFile}>
                        <i className="fa-solid fa-download fa-lg"></i>
                        Cifrar
                    </button>
                </div>
                <h1 className="m-4 text-xl font-semibold">Descifrar</h1>
                <div className="m-4 flex justify-between items-center">
                    <input type="file" accept=".txt" className="file-input file-input-bordered w-full max-w-xs" onChange={(e) => setEncryptedFile(e.target.files[0])} />
                    <button className="btn btn-ghost" onClick={decryptFile}>
                        <i className="fa-solid fa-download fa-lg"></i>
                        Descifrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Des;
