import React from 'react'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import styles from './Hamburger.module.scss'
import {Link} from 'react-router-dom'
import HamburgerClose from '../../../../images/header/hamburger-close.svg'
import {useOutside} from '../../../../hooks/useOutside'
import {useAuth} from "../../../../hooks/useAuth";

const Hamburger = () => {
  const menu = [
    {
      title: 'Workouts',
      link: '/workouts'
    }, {
      title: 'Create new',
      link: '/new-workout'
    }, {
      title: 'Profile',
      link: '/profile'
    }
  ]

  const {setIsAuth} = useAuth()
  const {ref, isComponentVisible, setIsComponentVisible} = useOutside(false)

  const HandleLogout = () => {
    localStorage.removeItem('token')
    setIsAuth(true)
    setIsComponentVisible(false)
  }
  return (
    <div className={styles.wrapper} ref={ref}>
      <button type={'button'} onClick={() => {
        setIsComponentVisible(!isComponentVisible)
      }}>
        <img height={24} src={isComponentVisible ? HamburgerClose : hamburgerImage} alt={'Auth'}/>
      </button>
      <nav className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}>
        <ul>
          {menu.map((item, index) => (
            <li key={item.title + item.link}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
          <li>
            <button onClick={HandleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Hamburger