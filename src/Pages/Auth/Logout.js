import React from 'react'
import Cookie from 'cookie-universal'
import axios from 'axios';
import { LOGOUT, baseUrl } from '../../Api/Api';
const Logout = () => {
const cookie = Cookie();

async function handelLogout() {
  try {
    const res = await axios.get (`${baseUrl}/${LOGOUT}`,{
      headers: {
        Authorization:'Bearer ' + cookie.get('e-commerce'),
      }
    })
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}  
  return (
    <button onClick={handelLogout}>Logout</button>
  )
}

export default Logout
