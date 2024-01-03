import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { closeProductEdit, updateProductOperation, getProduct, getMenuList } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade, Button
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

    const [file, setFile] = React.useState(null);
    const [changeFile, setChangeFile] = React.useState(false);

    function handleChange(e) {
        let reader = new FileReader();
        reader.onload = function (e) {
            setFile(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setChangeFile(true);
    }

    return (
        <div>
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={productDetail !== null}
                onClose={() => {
                    dispatch(closeProductEdit())
                    setFile(null);
                    setChangeFile(false);
                }}
            >
                <Box sx={style}>
                    <Fade in={productDetail !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Ürünü Düzenle
                            </Typography>
                            <div className="App">
                                <img src={!changeFile && productDetail?.image === null ?
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIG5y-eVT4ylcUtAGef3dpU3faonRbcNJ3Ag&usqp=CAU" : (!changeFile && productDetail?.image ? productDetail?.image : file)} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }} />
                                <input type="file" onChange={handleChange} />
                            </div>
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

                            </Stack>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        style={{ width: "100px", marginRight: "5px" }}
                                        onInput={(e) => setInputPrice(e.target.value)}
                                        onChange={(e) => setInputPrice(e.target.value)}
                                        defaultValue={productDetail?.price}
                                        name={"Fiyat"}
                                        key={"Fiyat"}
                                        inputProps={{ type: 'number' }}
                                        id="outlined-basic"
                                        label="Fiyat"
                                        variant="outlined"
                                    />
                                    <div>₺</div>
                                </div>
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(updateProductOperation({
                                        body: JSON.stringify({
                                            id: productDetail.id,
                                            categoryId: productDetail.categoryId,
                                            name: inputName ? inputName : productDetail.name,
                                            description: inputDesc ? inputDesc : productDetail.description,
                                            price: inputPrice ? inputPrice : productDetail.price,
                                            image: file ? file : productDetail.image,
                                            currency: productDetail.currency
                                        })
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getProduct({ productId: productDetail.id })).then((result) => {
                                                dispatch(getMenuList())
                                                dispatch(closeProductEdit())
                                                setFile(null);
                                                setChangeFile(false);
                                            });
                                        }
                                    });
                                }} style={{ border: '2px solid #B6E2D3', color: '#167D7F' }} startIcon={<SaveIcon />}>
                                    Kaydet
                                </Button>
                            </Stack>
                        </FormControl>
                    </Fade>
                </Box>
            </Modal>
        </div>
    )
}

export default ProductEdit