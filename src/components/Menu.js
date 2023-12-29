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
import { getProduct, getCategory, openNewProductWind, deleteProduct, removeProduct } from '../redux/MenuSlice'
import ProductEdit from "./ProductEdit";
import SubCategoryEdit from "./SubCategoryEdit";
import NewProduct from "./NewProduct";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <Grid container justifyContent="center" spacing={2}>
            {product.products?.map((subProduct) => (
                <Grid key={subProduct.id} item>
                    <Paper elevation={10} sx={{
                        maxWidth: 345, width: 300, height: "100%",
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <img src={subProduct.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {subProduct.name}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="div" style={{ color: "#4444FF", marginTop: '10px', fontWeight: "bold" }}>
                                {subProduct.description}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="div" style={{ marginTop: '10px', fontWeight: "bold" }}>
                                {subProduct.price} ₺
                            </Typography>
                        </CardContent>
                        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <IconButton onClick={() => {
                                dispatch(getProduct({ productId: subProduct.id }))
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                dispatch(deleteProduct({
                                    id: subProduct.id,
                                    categoryId: subProduct.categoryId
                                })).then((result) => {
                                    if (result.payload) {
                                        dispatch(removeProduct(subProduct))
                                    }
                                });
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    )
}

const CategoryCard = ({ category }) => {
    const dispatch = useDispatch();

    return (
        <AccordionDetails>
            {category.subCategories.length > 0 && (
                <div>
                    {category.subCategories.map(subCategory => (
                        <Accordion key={subCategory.id}>
                            <Box sx={{ display: "flex", backgroundColor: "#000C66", justifyContent: "flex-end" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ backgroundColor: "#000C66", color: "#fff", width: "1000px" }}
                                >
                                    <Typography>{subCategory.name}</Typography>
                                </AccordionSummary>
                                <Box>
                                    <IconButton onClick={() => {
                                        dispatch(getCategory({ categoryId: subCategory.id }))
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        dispatch(openNewProductWind(subCategory.id))
                                    }}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <AccordionDetails>
                                <div>
                                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                        <Grid item xs={12}>
                                            <ProductCard key={subCategory.id} product={subCategory} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            )}
        </AccordionDetails>
    );
};

const CategoryList = ({ categories }) => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {categories.map((item, index) => (
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
                        <CategoryCard key={item.id} category={item} />

                    </Accordion>
                ))}
            </Box>

        </div>
    );
};



const Menu = () => {
    const { menuList } = useSelector(state => state.menu);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((getMenuList()))
    }, []);

    return (
        <Container>
            <CategoryList categories={menuList.data.root} />

            <ProductEdit></ProductEdit>
            <SubCategoryEdit></SubCategoryEdit>
            <NewProduct></NewProduct>
        </Container>
    )
}

export default Menu