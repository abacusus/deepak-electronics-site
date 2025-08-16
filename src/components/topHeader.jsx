import React from 'react'

const topHeader = () => {
  return (
    <div className='bg-purple-600 h-14 text-white flex items-center px-4 font-semibold'>

      {/* //email us section */}
      <div className='flex items-center '>
        <lord-icon
          src="https://cdn.lordicon.com/vpbspaec.json"
          trigger="hover"
          stroke="bold"
          style={{ width: '35px', height: '35px' }}
          colors="primary:#ffffff,secondary:#000000">
        </lord-icon>
        <span className='px-4'>Email Us: <a href="deepakelectronics320@gmail.com">deepakelectronics320@gmail.com</a></span>
      </div>

      {/* //phone us section */}

      <div className='flex items-center '>
        <lord-icon
          src="https://cdn.lordicon.com/nnzfcuqw.json"
          trigger="hover"
          stroke="bold"
          style={{ width: '35px', height: '35px' }}
          colors="primary:#ffffff,secondary:#ffffff">
        </lord-icon>
        <span className='px-4'>Call Us: <a href="deepakelectronics320@gmail.com">+91 97170 99170</a></span>
      </div>

      {/* // //social media section */}

      <lord-icon
        src="https://cdn.lordicon.com/lplofcfe.json"
        trigger="hover"
        stroke="bold"
        style={{ width: '35px', height: '35px' }}
        colors="primary:#fff,secondary:#fff">
      </lord-icon>
      <lord-icon
        src="https://cdn.lordicon.com/cuwcpyqc.json"
        trigger="hover"
        stroke="bold"
        style={{ width: '35px', height: '35px' }}
        colors="primary:#fff,secondary:#fff">
      </lord-icon>
      <lord-icon
        src="https://cdn.lordicon.com/euybrknk.json"
        trigger="hover"
        stroke="bold"
        style={{ width: '35px', height: '35px' }}
        colors="primary:#fff,secondary:#fff">
      </lord-icon>

      {/* call me back section */}
      <div>
      <button className='flex items-center border border-black rounded-2xl p-1 '>
        <lord-icon
        src="https://cdn.lordicon.com/gkggixgu.json"
        trigger="hover"
        stroke="bold"
        style={{ width: '35px', height: '35px' }}
        colors="primary:#fff,secondary:#fff">
      </lord-icon> 
      Call Me Back
      </button>
      </div>


    </div>
  )
}

export default topHeader
