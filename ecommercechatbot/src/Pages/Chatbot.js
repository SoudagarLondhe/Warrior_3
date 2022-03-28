import React, { useRef, useState } from "react";
import './Chatbot.css'
// import ChatMessage from "./ChatMessageModel";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SendIcon from '@mui/icons-material/Send';

import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import {
    usePopupState,
    bindTrigger,
    bindPopover,
} from 'material-ui-popup-state/hooks'
import { Avatar, Badge, Grid } from "@material-ui/core";


const styles = (theme) => ({
    typography: {
        // margin: theme.spacing.unit * 2,
        padding: '20px',
        marginBottom: '50px'
    },
})


const ChatRoom = ({ classes }) => {
    const dummy = useRef()
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    const [badgeCount, setBadgeCount] = useState(0)

    const [categoryList, setcategoryList] = useState([
        {
            id: 1,
            feature: "Products",
            selected: false
        },
        {
            id: 2,
            feature: "Buys",
            selected: false
        },
       
    ])

    const handleCategory = (cat) => {
        const newList = categoryList.map((item) => {
            if (item.id === cat.id) {
                const updatedItem = {
                    ...item,
                    selected: !item.selected
                }
                return updatedItem
            }
            return item
        })
        setcategoryList(newList)
        setBadgeCount(categoryList.filter(item => item.selected === true).length)

    }

    const [messages, setMessages] = useState([
        {
            id: '1',
            sender: 'user',
            text: 'Products',
            timestamp: 'date-time',
            trailers: [
                'Buy details'
            ]
        },
        {
            id: '2',
            sender: 'Buy',
            text: 'Buy products?',
            timestamp: 'date-time',
            trailers: [
                'Yes',
                'No',
                'Get details'
            ]
        },
    ]
    )
    const [formValue, setFormValue] = useState('')


    const sendMessage = async (e) => {
        e.preventDefault();
        if (formValue != '') {

            setMessages(messages => messages.concat({
                id: '3',
                sender: 'user',
                text: formValue,
                timestamp: 'DD/MM/YYYY 00:00am',
                trailers: [

                ]
            }))

            setFormValue('')
            dummy.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const avoidRefresh = (e) => {
        e.preventDefault();
    }

    return (
        <div id="chatbotScreen">

            <div className="header" id="chatbotHeader" >
                SMART CHATBOT
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <div style={{ color: 'red', width: '20px', height: '20px', backgroundColor: 'red', marginBottom: '170px', height: '10vh', position: 'fixed' }}>
                    E-Commerce Agent

                </div>

                <form onSubmit={avoidRefresh} className="chatbotForm" >

                    <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write your response" className="chatbotInput" />


                    <Button  {...bindTrigger(popupState)}>
                        <Badge color="secondary" badgeContent={badgeCount} >
                            Category
                        </Badge>

                    </Button>
                    <Popover
                        className="chatbotPopover"
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',


                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',

                        }}
                        marginThreshold='100'
                    >
                        <div style={{ padding: '60px', borderRadius: '20px' }} className="actionsGridDiv">
                            <Grid container spacing={3}>
                                {categoryList.map(category => (

                                    <Grid item xs={6} md={3} lg={2} xl={2} >
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => handleCategory(category)}>

                                            <Avatar src={category.img} className="categoryAvatar" style={{ height: '60px', width: '60px', }} />
                                            <p className="actiondesc" style={{ textAlign: 'center', fontFamily: 'Secular One, sans-serif', fontSize: '20px' }}>{category.feature}</p>
                                        </div>
                                    </Grid>
                                ))}



                            </Grid>

                        </div>
                        {/* <Typography className={classes.typography}>
                            The content of the Popover.
                        </Typography> */}
                    </Popover>

                    <button type="submit" onClick={sendMessage}><SendIcon style={{ color: '#4EBCEC' }} /></button>
                </form>
            </div>
        </div>
    );
}

ChatRoom.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatRoom);
