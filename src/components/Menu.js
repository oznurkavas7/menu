import React, { useEffect } from "react";
import {
    Accordion, AccordionSummary, AccordionDetails, Box,
    Typography, Paper, CardContent, Grid, Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { getMenuList } from '../redux/MenuSlice'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { openProductEdit } from '../redux/MenuSlice'
import ProductEdit from "./ProductEdit";

const Menu = () => {
    const { menuList } = useSelector(state => state.menu);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((getMenuList()))
    }, []);

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                {menuList.data.root.map((item, index) => (
                    <Accordion key={index}>
                        <Box sx={{ display: "flex", backgroundColor: "blue", justifyContent: "flex-end" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ backgroundColor: "blue", color: "#fff", width: "600px" }}
                            >
                                <Typography>{item.name}</Typography>
                            </AccordionSummary>
                            <Box>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <AccordionDetails>
                            <div>
                                {menuList.data.root[index].subCategories.map((item2, index2) => (
                                    <Accordion key={index2}>
                                        <Box sx={{ display: "flex", backgroundColor: "#000C66", justifyContent: "flex-end" }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={{ backgroundColor: "#000C66", color: "#fff", width: "1000px" }}
                                            >
                                                <Typography>{item2.name}</Typography>
                                            </AccordionSummary>
                                            <Box>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <AccordionDetails>
                                            <div>
                                                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container justifyContent="center" spacing={2}>
                                                            {menuList.data.root[index].subCategories[index2].products.map((item3, index3) => (
                                                                <Grid key={index3} item>
                                                                    <Paper elevation={10} sx={{
                                                                        maxWidth: 345, width: 300, height: "100%",
                                                                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                                                    }}>
                                                                        <img src={item3.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h6" component="div">
                                                                                {item3.name}
                                                                            </Typography>
                                                                            <Typography gutterBottom variant="h7" component="div" style={{ color: "#4444FF", marginTop: '10px', fontWeight: "bold" }}>
                                                                                {item3.description}
                                                                            </Typography>
                                                                            <Typography gutterBottom variant="h7" component="div" style={{ marginTop: '10px', fontWeight: "bold" }}>
                                                                                {item3.price} ₺
                                                                            </Typography>
                                                                        </CardContent>
                                                                        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                                            <IconButton onClick={() => dispatch(openProductEdit(item3))}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                            <IconButton>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </div>
                                                                    </Paper>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <ProductEdit></ProductEdit>
        </Container>
    )
}

export default Menu