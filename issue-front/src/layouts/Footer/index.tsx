import React from 'react'
import './style.css'


export default function footer() {

  


  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'텍스트'}</div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='fotter-copyright'>{'여기에도 목록표시'}</div>
            </div>
        </div>
    </div>
  )
}
