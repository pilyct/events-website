import React from 'react';
import './Header.css'

export default function Header() {

  const FIRMA = '💥Eventify';

  return (
    <div className='header'>
      <div className='title'>{FIRMA}</div>
    </div>
  )
}