import React from 'react'
import classes from './style/listItem.module.css'
import ListItem from './ListItem'
import listData from '../listData'
import { useState } from 'react'

const List = (props) => {
    return(
        <div className={classes.container}>
            {/* listData.map((i) => <ListItem title= {i} btn1="edit" btn1="delete" key= {i.id}/>) */}
        </div>
    )
}

export default List