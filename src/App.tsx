import QRCode from "react-qr-code";
import { useState, useRef,  FocusEvent } from "react";
import './App.css'

function App() {
  const [qrCodeValue, setQRCodeValue] = useState<string>("");
  const [message, setMessage] = useState<string>('');
  const [correct, setCorrect ] = useState<boolean>(false);
  const svgRef = useRef<HTMLDivElement | null>(null);

  const isUrlCorrect = (url : string) => {
    try {
      new URL(url);
      setCorrect(true);
      setMessage('')
  
    } catch (err) {
      setCorrect(false);
      setMessage("Niepoprawny adres url")
    }
  }

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQRCodeValue(value);
  };

  const handleOnBlur = () => {
    // const value = e.target.value;
    isUrlCorrect(qrCodeValue);
    // correct ? setMessage("Niepoprawny adres url") : setMessage('ok');
  }

  const handleSaveSVG = () => {
    const svgContent = svgRef.current?.outerHTML;
    if(svgContent) {
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code-image.svg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("svgContent is null or undefined");
    }
  
  };

  return (
    <div className="container h-lvh flex flex-col justify-between mx-auto py-16">
      <header className="flex justify-center items-center">
        <h1 className="text-4xl text-center font-bold pr-2 ">Generator kodu</h1>
        <svg width="6rem" height="6rem" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M500 666.667H600C617.681 666.667 634.638 659.643 647.14 647.141C659.643 634.638 666.667 617.681 666.667 600V500C666.667 491.16 670.179 482.681 676.43 476.43C682.681 470.179 691.159 466.667 700 466.667C708.841 466.667 717.319 470.179 723.57 476.43C729.821 482.681 733.333 491.16 733.333 500V600C733.333 635.362 719.286 669.276 694.281 694.281C669.276 719.286 635.362 733.333 600 733.333H200C164.638 733.333 130.724 719.286 105.719 694.281C80.7143 669.276 66.6667 635.362 66.6667 600V500C66.6667 491.16 70.1786 482.681 76.4298 476.43C82.681 470.179 91.1595 466.667 100 466.667C108.841 466.667 117.319 470.179 123.57 476.43C129.821 482.681 133.333 491.16 133.333 500V600C133.333 617.681 140.357 634.638 152.86 647.141C165.362 659.643 182.319 666.667 200 666.667H300C308.841 666.667 317.319 670.179 323.57 676.43C329.821 682.681 333.333 691.16 333.333 700C333.333 708.841 329.821 717.319 323.57 723.57C317.319 729.822 308.841 733.333 300 733.333H500C491.159 733.333 482.681 729.822 476.43 723.57C470.179 717.319 466.667 708.841 466.667 700C466.667 691.16 470.179 682.681 476.43 676.43C482.681 670.179 491.159 666.667 500 666.667ZM133.333 300C133.333 308.841 129.821 317.319 123.57 323.57C117.319 329.821 108.841 333.333 100 333.333C91.1595 333.333 82.681 329.821 76.4298 323.57C70.1786 317.319 66.6667 308.841 66.6667 300V200C66.6667 164.638 80.7143 130.724 105.719 105.719C130.724 80.7143 164.638 66.6667 200 66.6667L300 66.6667C308.841 66.6667 317.319 70.1786 323.57 76.4299C329.821 82.6811 333.333 91.1595 333.333 100C333.333 108.841 329.821 117.319 323.57 123.57C317.319 129.822 308.841 133.333 300 133.333H200C182.319 133.333 165.362 140.357 152.86 152.86C140.357 165.362 133.333 182.319 133.333 200V300ZM666.667 300V200C666.667 182.319 659.643 165.362 647.14 152.86C634.638 140.357 617.681 133.333 600 133.333H500C491.159 133.333 482.681 129.822 476.43 123.57C470.179 117.319 466.667 108.841 466.667 100C466.667 91.1595 470.179 82.6811 476.43 76.4299C482.681 70.1786 491.159 66.6667 500 66.6667H600C635.362 66.6667 669.276 80.7143 694.281 105.719C719.286 130.724 733.333 164.638 733.333 200V300C733.333 308.841 729.821 317.319 723.57 323.57C717.319 329.821 708.841 333.333 700 333.333C691.159 333.333 682.681 329.821 676.43 323.57C670.179 317.319 666.667 308.841 666.667 300Z" fill="black"/>
        <path d="M431.414 500V300H506.414C521.779 300 534.669 302.669 545.086 308.008C555.568 313.346 563.478 320.833 568.816 330.469C574.22 340.039 576.922 351.204 576.922 363.965C576.922 376.79 574.188 387.923 568.719 397.363C563.315 406.738 555.34 413.997 544.793 419.141C534.246 424.219 521.29 426.758 505.926 426.758H452.508V396.68H501.043C510.027 396.68 517.384 395.443 523.113 392.969C528.842 390.43 533.074 386.751 535.809 381.934C538.608 377.051 540.008 371.061 540.008 363.965C540.008 356.868 538.608 350.814 535.809 345.801C533.009 340.723 528.745 336.881 523.016 334.277C517.286 331.608 509.897 330.273 500.848 330.273H467.645V500H431.414ZM534.734 409.375L584.246 500H543.816L495.184 409.375H534.734Z" fill="black"/>
        <path d="M292.693 432.812H325.506L344.939 458.008L358.807 474.414L392.107 517.188H356.951L334.295 488.477L324.627 474.805L292.693 432.812ZM396.893 400C396.893 421.549 392.856 440.007 384.783 455.371C376.775 470.671 365.838 482.389 351.971 490.527C338.169 498.665 322.511 502.734 304.998 502.734C287.485 502.734 271.795 498.665 257.928 490.527C244.126 482.324 233.188 470.573 225.115 455.273C217.107 439.909 213.104 421.484 213.104 400C213.104 378.451 217.107 360.026 225.115 344.727C233.188 329.362 244.126 317.611 257.928 309.473C271.795 301.335 287.485 297.266 304.998 297.266C322.511 297.266 338.169 301.335 351.971 309.473C365.838 317.611 376.775 329.362 384.783 344.727C392.856 360.026 396.893 378.451 396.893 400ZM360.467 400C360.467 384.831 358.09 372.038 353.338 361.621C348.65 351.139 342.14 343.229 333.807 337.891C325.473 332.487 315.87 329.785 304.998 329.785C294.126 329.785 284.523 332.487 276.189 337.891C267.856 343.229 261.313 351.139 256.561 361.621C251.873 372.038 249.529 384.831 249.529 400C249.529 415.169 251.873 427.995 256.561 438.477C261.313 448.893 267.856 456.803 276.189 462.207C284.523 467.546 294.126 470.215 304.998 470.215C315.87 470.215 325.473 467.546 333.807 462.207C342.14 456.803 348.65 448.893 353.338 438.477C358.09 427.995 360.467 415.169 360.467 400Z" fill="black"/>
        </svg>
      </header>
     
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="text-center">
        <h2 className="text-xl t pb-4 ">Wprowadź pełen adres URL</h2>
        <div className="relative">
        <input
            type="text"
            name="qrCodeValue"
            placeholder="https://jareckiweb.pl"
            value={qrCodeValue}
            onChange={handleChange}
            onBlur={handleOnBlur}
            className="border border-slate-700 px-2 py-1 rounded-lg"
          />
           <p className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[100%] w-full text-center text-xs text-red-500">{message}</p>
        </div>
         
        </div>
     
        <div ref={svgRef} className="mx-auto">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "175px", width: "100%" }}
            value={qrCodeValue}
            viewBox={`0 0 256 256`}
          />
        </div>
       <div>
        <button className="bg-black text-white px-6 py-4 rounded-full disabled:opacity-75 disabled:cursor-not-allowed" onClick={handleSaveSVG}  disabled={!qrCodeValue || correct === false }>Pobierz obrazek SVG</button>
       </div>

      </div>
      <footer className="">
        <p className="text-center"> Codded by <a className="underline" href="https://jareckiweb.pl">Michał Jarecki</a></p>
      </footer >
     
    </div>
  );
}

export default App
