import React, { useState } from 'react';

const Rsa = () => {
    const [prime1, setPrime1] = useState('');
    const [prime2, setPrime2] = useState('');
    const [message, setMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [n, setN] = useState('');
    const [fhiN, setFhiN] = useState('');

    function calculateKeys() {
        const p = parseInt(prime1);
        const q = parseInt(prime2);

        if (!isPrime(p) || !isPrime(q)) {
            alert('Ambos números deben ser primos');
            return;
        }

        if (p.toString().length !== 4 || q.toString().length !== 4) {
            alert('Ambos números deben tener 4 dígitos');
            return;
        }

        // Cálculo de n
        const calculatedN = p * q;
        setN(calculatedN.toString());

        // Cálculo de fhi(n)
        const fhiN = (p - 1) * (q - 1);
        setFhiN(fhiN.toString());

        // Cálculo de e (clave pública)
        let e = 2;
        while (e < fhiN) {
            if (gcd(e, fhiN) === 1) break;
            e++;
        }

        // Cálculo de d (clave privada)
        const d = modInverse(e, fhiN);

        setPublicKey(e.toString());
        setPrivateKey(d.toString());
        setEncryptedMessage('');
        setDecryptedMessage('');
    }

    function encryptMessage() {
        const e = parseInt(publicKey);
        const messageNumbers = message.split(',').map(num => parseInt(num));

        const encryptedNumbers = messageNumbers.map(num => {
            const validNumber = num % parseInt(n);
            return modExp(validNumber, e, parseInt(n));
        });

        const encryptedMessage = encryptedNumbers.join(',');
        setEncryptedMessage(encryptedMessage);
        setDecryptedMessage('');
    }

    function decryptMessage() {
        const d = parseInt(privateKey);
        const encryptedNumbers = encryptedMessage.split(',').map(num => parseInt(num));

        const decryptedNumbers = encryptedNumbers.map(num => {
            return modExp(num, d, parseInt(n));
        });

        const decryptedMessage = decryptedNumbers.join(',');
        setDecryptedMessage(decryptedMessage);
    }

    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    function modExp(base, exponent, modulus) {
        if (modulus === 1) return '0';

        let result = 1;
        base = base % modulus;

        while (exponent > 0) {
            if (exponent % 2 === 1) {
                result = (result * base) % modulus;
            }

            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
        }

        return result.toString();
    }

    function modInverse(a, m) {
        let m0 = m;
        let y = 0,
            x = 1;

        if (m === 1) return '0';

        while (a > 1) {
            const q = Math.floor(a / m);
            let t = m;

            m = a % m;
            a = t;
            t = y;

            y = x - q * y;
            x = t;
        }

        if (x < 0) x = x + m0;

        return x.toString();
    }

    function isPrime(num) {
        if (num < 2) {
            return false;
        }

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

    const limpiarCampos = () => {
        setPrime1('');
        setPrime2('');
        setMessage('');
        setEncryptedMessage('');
        setDecryptedMessage('');
        setPublicKey('');
        setPrivateKey('');
        setN('');
        setFhiN('');
    };

    return (
        <div>
            <div className="m-4 font-semibold">
                <h1 className="text-5xl">RSA</h1>
                <p className="text-xl">Rivest, Shamir y Adelman</p>
            </div>
            <div className="m-4 flex justify-between items-center">
                <input
                    type="number"
                    placeholder="Mensaje Numérico"
                    className="input input-bordered w-80"
                    id="plaintext"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="btn btn-ghost mask mask-squircle flex justify-end"
                    onClick={limpiarCampos}>
                    <i className="fa-solid fa-broom fa-xl"></i>
                </button>
            </div>
            <div className="m-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">1er número primo (p): </span>
                        </label>
                        <input
                            type="number"
                            id="prime1"
                            value={prime1}
                            className="input input-bordered w-40"
                            onChange={(e) => setPrime1(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">2do número primo (q): </span>
                        </label>
                        <input
                            type="number"
                            id="prime2"
                            value={prime2}
                            className="input input-bordered w-40"
                            onChange={(e) => setPrime2(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-end">
                    <button
                        className="btn btn-ghost"
                        onClick={calculateKeys}>
                        Generar Claves
                    </button>
                </div>
            </div>
            <div className="mx-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <p className="my-2 text-xl font-semibold">Clave Pública(e):</p>
                    <textarea
                        type="text"
                        value={publicKey}
                        className="my-2 input input-bordered w-40"
                        onChange={(e) => setPublicKey(e.target.value)}
                        disabled
                    />
                    <button
                        className="my-2 btn btn-ghost w-20"
                        onClick={encryptMessage}>
                        Cifrar
                    </button>
                    <p className="my-2 text-xl font-semibold">Cifrado:</p>
                    <textarea
                        type="text"
                        value={encryptedMessage}
                        className="my-2 input input-bordered w-48"
                        disabled
                    />
                </div>
                <div className="flex flex-col">
                    <p className="my-2 text-xl font-semibold">Clave Privada(d):</p>
                    <textarea
                        type="text"
                        value={privateKey}
                        className="my-2 input input-bordered w-48"
                        onChange={(e) => setPrivateKey(e.target.value)}
                        disabled
                    />
                    <button
                        className="my-2 btn btn-ghost w-20"
                        onClick={decryptMessage}>
                        Descifrar
                    </button>
                    <p className="my-2 text-xl font-semibold">Descifrado:</p>
                    <textarea
                        type="text"
                        value={decryptedMessage}
                        className="my-2 input input-bordered w-48"
                        onChange={(e) => setDecryptedMessage(e.target.value)}
                        disabled
                    />
                </div>
            </div>
            <div className="collapse">
                <input type="checkbox" className="peer" />
                <div className="collapse-title">
                    <p className="text-xl font-semibold">Click para ver resultado de cálculos:</p>
                </div>
                <div className="collapse-content">
                    <p>fhi(n): {fhiN}</p>
                    <p>n: {n}</p>
                    <p>e (Clave pública): {publicKey}</p>
                    <p>d (Clave privada): {privateKey}</p>
                </div>
            </div>
        </div>
    );
};

export default Rsa;
