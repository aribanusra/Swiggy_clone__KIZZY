import React from 'react'
import { useRouteError } from 'react-router-dom'
const Error = () => {
    const err=useRouteError();
console.log(err);
  return (
    <div>
        <h3>Something went wrong</h3>
        <h2>{err.status} : { err.error.message}</h2>
    </div>
  )
}

export default Error