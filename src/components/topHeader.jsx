import React from 'react'

const topHeader = () => {
  return (
    <div className="top-header relative overflow-hidden h-14 text-white flex items-center justify-between  font-semibold"
      style={{ backgroundColor: "#7569E0" }}>
      <style>
        {`
         @keyframes fadeInOut {
            0%, 40% { opacity: 1; transform: scale(1); }
            50% { opacity: 0; transform: scale(0.95); }
            90%, 100% { opacity: 0; transform: scale(0.95); }
          }

          @keyframes fadeOutIn {
            0%, 40% { opacity: 0; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1); }
            90%, 100% { opacity: 1; transform: scale(1); }
          }

          .fadeInOut { animation: fadeInOut 6s infinite ease-in-out; }
          .fadeOutIn { animation: fadeOutIn 6s infinite ease-in-out; }

          .top-header:hover .fadeInOut,
          .top-header:hover .fadeOutIn {
            animation-play-state: paused;
            color: #FFD700;
          }
        `}
      </style>

      {/* E-mail */}
      <div className="absolute inset-0 flex items-center  text-base sm:text-base">
        <div className="fadeInOut truncate overflow-hidden absolute flex items-center gap-2 ">
          <lord-icon
            src="https://cdn.lordicon.com/vpbspaec.json"
            trigger="hover"
            stroke="bold"
            style={{ width: '28px', height: '28px' }}
            colors="primary:#ffffff,secondary:#000000"
          ></lord-icon>
          <span >
            Email: <a href="mailto:deepakelectronics320@gmail.com">deepakelectronics320@gmail.com</a>
          </span>
        </div>


          {/* Mobile-No. */}
        <div className="fadeOutIn absolute flex items-center gap-2">
          <lord-icon
            src="https://cdn.lordicon.com/nnzfcuqw.json"
            trigger="hover"
            stroke="bold"
            style={{ width: '28px', height: '28px' }}
            colors="primary:#ffffff,secondary:#ffffff"
          ></lord-icon>
          <span className="px-2  sm:max-w-none">
            Call: <a href="tel:+919717099170">+91 97170 99170</a>
          </span>
        </div>
      </div>

      
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* social media */}
        <div className="hidden sm:flex gap-2">
          <lord-icon src="https://cdn.lordicon.com/lplofcfe.json" trigger="hover" stroke="bold"
            style={{ width: '25px', height: '25px' }} colors="primary:#fff,secondary:#fff"></lord-icon>
          <lord-icon src="https://cdn.lordicon.com/cuwcpyqc.json" trigger="hover" stroke="bold"
            style={{ width: '25px', height: '25px' }} colors="primary:#fff,secondary:#fff"></lord-icon>
          <lord-icon src="https://cdn.lordicon.com/euybrknk.json" trigger="hover" stroke="bold"
            style={{ width: '25px', height: '25px' }} colors="primary:#fff,secondary:#fff"></lord-icon>
        </div>

        {/* Call me back  */}
        <button
          onClick={() => alert("Button is working ")}
          className="hidden sm:flex items-center border border-white rounded-2xl px-2 sm:px-3 py-1 cursor-pointer 
             hover:bg-white hover:text-violet-700 transition-colors text-xs sm:text-sm flex-shrink-0"
        >
          <lord-icon
            src="https://cdn.lordicon.com/gkggixgu.json"
            trigger="hover"
            stroke="bold"
            style={{ width: '22px', height: '22px' }}
            colors="primary:#fff,secondary:#fff"
          ></lord-icon>
          <span className="ml-1 sm:ml-2">Call Me Back</span>
        </button>
      </div>
    </div>
  )
}

export default topHeader
