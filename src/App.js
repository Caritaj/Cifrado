import React, { useState } from 'react';
import './App.css';
import CesarVigenere from './components/cesarviegenere';
import DES from './components/des';
import AES from './components/aes';
import RSA from './components/rsa';

function App() {
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const [selectedOption, setSelectedOption] = useState('')

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case 'home':
        return null;
      case 'cesarviegenere':
        return <CesarVigenere />;
      case 'aes':
        return <AES />
      case 'des':
        return <DES />;
      case 'rsa':
        return <RSA />;
      default:
        return null;
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <h1 className="text-5xl font-bold">Servicio de Cifrado</h1>
          </div>
          <div className="flex-none hidden lg:block">
            <div className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <button
                className="btn btn-ghost mr-4 "
                onClick={() => handleOptionClick('home')}>
                <i className="fa-solid fa-house fa-lg"></i>
              </button>
              <button
                className="btn btn-ghost mr-4 "
                onClick={() => handleOptionClick('cesarviegenere')}>
                César/Vigenére
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => handleOptionClick('aes')}>
                AES
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => handleOptionClick('des')}>
                DES
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => handleOptionClick('rsa')}>
                RSA
              </button>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className="hero h-screen overflow-y-auto" style={{ backgroundImage: "url(https://globalendar.com/wp-content/uploads/2023/03/fondos-de-pantalla-aesthetic-blanco-2-scaled.jpg)" }}>
          <div className="hero-content text-left">
            {renderSelectedOption()}
          </div>
        </div>
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
          <div className="items-center grid-flow-col">
            <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clip-rule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
            <p>Copyright © 2023 - All right reserved</p>
          </div>
        </footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 h-full bg-base-200">
          {/* Sidebar content here */}
          <button
            className="btn btn-ghost mr-4 "
            onClick={() => handleOptionClick('home')}>
            <i className="fa-solid fa-house fa-lg"></i>
          </button>
          <button
            className="btn btn-ghost mr-4 "
            onClick={() => handleOptionClick('cesarviegenere')}>
            César/Vigenére
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handleOptionClick('aes')}>
            AES
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handleOptionClick('des')}>
            DES
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handleOptionClick('rsa')}>
            RSA
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
