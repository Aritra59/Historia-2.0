import React from 'react'
import { useParams } from 'react-router-dom'
function ViewPage() {
    const params= useParams()
    const location = params.title
  return (
    <div>{location}</div>
  )
}

export default ViewPage