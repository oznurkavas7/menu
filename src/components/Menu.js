import React, { useEffect } from "react";
import {
    Accordion, AccordionSummary, AccordionDetails, Box,
    Typography, Paper, CardContent, Grid, Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getProduct, getCategory, openNewProductWind, openNewSubCatWind, deleteProduct,
    deleteSubCat, getMenuList, getMainCategory
} from '../redux/MenuSlice'
import ProductEdit from "./ProductEdit";
import SubCategoryEdit from "./SubCategoryEdit";
import NewProduct from "./NewProduct";
import MainCategoryEdit from "./MainCategoryEdit";
import NewSubCategory from "./NewSubCategory";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <Grid container justifyContent="center" spacing={2}>
            {product.products?.map((subProduct) => (
                <Grid key={subProduct.id} item>
                    <Paper elevation={10} sx={{
                        maxWidth: 345, minWidth: 345, height: "100%", display: 'flex', flexDirection: 'column',
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <CardContent>
                                    <img src={subProduct?.image == null ?
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIG5y-eVT4ylcUtAGef3dpU3faonRbcNJ3Ag&usqp=CAU" : subProduct?.image}
                                        alt='' style={{
                                            justifyContent: 'center', display: 'flex',
                                            objectFit: "cover", height: "150px", width: "100%"
                                        }}></img>
                                </CardContent>
                            </Grid>
                            <Grid item xs={7}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {subProduct.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="div" style={{ color: "#29A0B1", marginTop: '10px', fontWeight: "bold" }}>
                                        {subProduct.description}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="div" style={{ marginTop: '10px', fontWeight: "bold" }}>
                                        {subProduct.price} ₺
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                        <div style={{ marginLeft: 'auto', marginTop: 'auto' }}>
                            <IconButton onClick={() => dispatch(getProduct({ productId: subProduct.id }))}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => {
                                dispatch(deleteProduct({
                                    body: JSON.stringify({
                                        id: subProduct.id,
                                        categoryId: subProduct.categoryId
                                    })
                                })).then((result) => {
                                    if (result.payload) {
                                        dispatch(getMenuList())
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
                            <Box sx={{ display: "flex", backgroundColor: "#D8A7B1", justifyContent: "flex-end", marginTop: '10px' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ backgroundColor: "#D8A7B1", color: "#fff", width: "1000px" }}
                                >
                                    <div>
                                        <Typography>{subCategory.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{subCategory.description}</Typography>
                                    </div>
                                </AccordionSummary>
                                <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
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
                                    <IconButton onClick={() => {
                                        dispatch(deleteSubCat({
                                            body: JSON.stringify({
                                                id: subCategory.id
                                            })
                                        })).then((result) => {
                                            if (result.payload) {
                                                dispatch(getMenuList())
                                            }
                                        });
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
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
    const dispatch = useDispatch();

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                {categories.map((item, index) => (
                    <Accordion key={index}>
                        <Box sx={{ display: "flex", backgroundColor: "#EF7C8E", justifyContent: "flex-end", marginTop: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ backgroundColor: "#EF7C8E", color: "#fff", width: "600px" }}
                            >
                                <div>
                                    <Typography>{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                </div>
                            </AccordionSummary>
                            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                <IconButton onClick={() => {
                                    dispatch(getMainCategory({ mainCategoryId: item.id }))
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {
                                    dispatch(openNewSubCatWind(item.id))
                                }}>
                                    <AddIcon />
                                </IconButton>
                            </div>

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
            <MainCategoryEdit></MainCategoryEdit>
            <NewSubCategory></NewSubCategory>
        </Container>
    )
}

export default Menu