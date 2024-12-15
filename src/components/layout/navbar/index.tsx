import React from 'react'

const NavBar = async () => {
  const menu = await getMenu("next-js-frontend-nav")
  return (
    <div>NavBar</div>
  )
}

export default NavBar