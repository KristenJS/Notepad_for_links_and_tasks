import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <div className='links' style={{fontSize: '16px'}}>
      <h4>Link</h4>

      <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Number of clicks: <strong>{link.clicks}</strong></p>
      <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

    </div>
  )
}