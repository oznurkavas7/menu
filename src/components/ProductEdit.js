import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import { closeProductEdit, updateProductOperation, getProduct } from '../redux/MenuSlice'
import {
    Dialog, TextField, Typography, Box, FormControl, Stack, Card, CardContent, Modal, Fade
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const ProductEdit = () => {
    const [inputName, setInputName] = React.useState("");
    const [inputDesc, setInputDesc] = React.useState("");
    const [inputPrice, setInputPrice] = React.useState("");

    const { productDetail } = useSelector(state => state.menu);
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
                                            dispatch(closeProductEdit())
                                            dispatch(getProduct({ categoryId: productDetail.categoryId })).then((result) => {
                                                console.log(result.payload.data);
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

/*
            <BootstrapDialog
                onClose={() => dispatch(closeProductEdit())}
                aria-labelledby="customized-dialog-title"
                open={productDetail !== null}
                style={{ maxHeight: "calc(100% - 30px)", margin: "auto" }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography><b>Ürünü Düzenle</b></Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(closeProductEdit())}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Container style={{ width: "500px" }}>
                    <DialogContent dividers>
                        <div>
                            <TextField 
                                onInput={(e) => setInputName(e.target.value)}
                                onChange={(e) => setInputName(e.target.value)}
                                value={productDetail?.name}
                            style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <TextField id="outlined-multiline-static"
                                multiline
                                rows={4}
                                style={{ width: "400px" }}
                                onInput={(e) => setInputDesc(e.target.value)}
                                onChange={(e) => setInputDesc(e.target.value)}
                                value={productDetail?.description}
                                label="Açıklama" variant="outlined" />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <TextField style={{ width: "100px" }} 
                              onInput={(e) => setInputPrice(e.target.value)}
                              onChange={(e) => setInputPrice(e.target.value)}
                              value={productDetail?.price}
                              inputProps={{ type: 'number' }} id="outlined-basic" label="Fiyat" variant="outlined" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton onClick={() => {
                                dispatch(updateProductOperation({ id: productDetail.id, categoryId: productDetail.categoryId, name: inputName, desc: inputDesc, price: inputPrice }))
                                .then((result) => {
                                    dispatch(closeProductEdit())
                                });
                            }}>
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </DialogContent>
                </Container>
            </BootstrapDialog>
            */