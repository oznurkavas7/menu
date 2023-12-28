import React, { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import { closeProductEdit, updateProductOperation, getProduct, changeProductDetail } from '../redux/MenuSlice'
import {
    Dialog, TextField, Typography, Box, FormControl, Stack, Card, CardContent, Modal, Fade
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const ProductEdit = () => {
    const [inputName, setInputName] = React.useState("");
    const [inputDesc, setInputDesc] = React.useState("");
    const [inputPrice, setInputPrice] = React.useState("");

    const { productDetail} = useSelector(state => state.menu);

    const dispatch = useDispatch()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={productDetail !== null}
                onClose={() => dispatch(closeProductEdit())}
            >
                <Box sx={style}>
                    <Fade in={productDetail !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Ürünü Düzenle
                            </Typography>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <TextField
                                    onInput={(e) => setInputName(e.target.value)}
                                    onChange={(e) => setInputName(e.target.value)}
                                    key={"İsim"}
                                    defaultValue={productDetail?.name}
                                    name={"İsim"}
                                    style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                                <TextField id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: "400px" }}
                                    onInput={(e) => setInputDesc(e.target.value)}
                                    onChange={(e) => setInputDesc(e.target.value)}
                                    defaultValue={productDetail?.description}
                                    name={"Açıklama"}
                                    key={"Açıklama"}
                                    label="Açıklama" variant="outlined" />
                                <TextField style={{ width: "100px" }}
                                    onInput={(e) => setInputPrice(e.target.value)}
                                    onChange={(e) => setInputPrice(e.target.value)}
                                    defaultValue={productDetail?.price}
                                    name={"Fiyat"}
                                    key={"Fiyat"}
                                    inputProps={{ type: 'number' }} id="outlined-basic" label="Fiyat" variant="outlined" />
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <IconButton onClick={() => {
                                    dispatch(updateProductOperation({
                                        id: productDetail.id,
                                        categoryId: productDetail.categoryId,
                                        name: inputName ? inputName : productDetail.name,
                                        desc: inputDesc ? inputDesc : productDetail.description,
                                        price: inputPrice ? inputPrice : productDetail.price,
                                        image: productDetail.image,
                                        currency: productDetail.currency
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getProduct({productId: productDetail.id })).then((result) => {
                                                dispatch(changeProductDetail(result))
                                                dispatch(closeProductEdit())
                                            });
                                        }
                                    });
                                }}>
                                    <SaveIcon />
                                </IconButton>
                            </Stack>
                        </FormControl>
                    </Fade>
                </Box>
            </Modal>
        </div>
    )
}

export default ProductEdit