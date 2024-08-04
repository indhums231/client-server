import React from 'react'
import play_store from '../Images/play_store.png'
import app_store from '../Images/app_store.png'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br />Delicious Recipes&#128523; App</p>
      <div className="app-download-platforms">
        <img src={play_store} alt="" />
        <img src={app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
