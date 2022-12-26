import React, {useEffect} from 'react'
import loader from "../img/loaderball.svg"
import classes from './style/loader.module.css'

//import products from './dummyData'
const Loader = () => {

  return (
    <div className={classes.body}>
        <img src={loader} alt='loader' />
    </div>
  )
}

export default Loader