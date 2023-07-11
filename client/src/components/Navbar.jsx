import React from 'react'

function Navbar() {
  return (
    <div className='sticky top-0 left-0 p-2 z-40'>
      <img className='h-6 ml-2 my-1 object-contain' src={require("../assets/resume-builder-high-resolution-logo-white-on-transparent-background.png")} alt="logo" />
      
    </div>
  )
}

export default Navbar