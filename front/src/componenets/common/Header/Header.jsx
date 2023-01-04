import React from 'react'
import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import Hamburger from './Hamburger/Hamburger'
import arrowImage from '../../../images/header/arrow.svg'
import {useLocation, useNavigate} from 'react-router-dom'
import AuthImage from '../../../images/header/dumbbell.svg'
import {useAuth} from "../../../hooks/useAuth";

const Header = () => {
  const {isAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation().pathname
  return (
    <header className={styles.header}>
      {location !== '/' ? <button onClick={() => navigate(-1)}>
        <img src={arrowImage} alt={'back'}/>
      </button> : <button onClick={() => navigate(isAuth ? '/profile' : '/auth')}>
        <img height={40} src={isAuth ? AuthImage : userImage} alt={'Auth'}/>
      </button>}
      <Hamburger/>
    </header>
  )
}

export default Header