import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { closeNewProduct, newProductOperation, getProduct, getMenuList } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const NewProduct = () => {
    const [newName, setNewName] = React.useState("");
    const [newDesc, setNewDesc] = React.useState("");
    const [newtPrice, setNewPrice] = React.useState("");

    const { newProductCatId } = useSelector(state => state.menu);

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
                open={newProductCatId !== null}
                onClose={() => {
                    dispatch(closeNewProduct());
                    setFile(null);
                    setChangeFile(false)
                }}
            >
                <Box sx={style}>
                    <Fade in={newProductCatId !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Yeni Ürün
                            </Typography>
                            <div className="App">
                                <img src={!changeFile ?
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIG5y-eVT4ylcUtAGef3dpU3faonRbcNJ3Ag&usqp=CAU" :
                                    file} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }} />
                                <input type="file" onChange={handleChange} />
                            </div>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <TextField
                                    onInput={(e) => setNewName(e.target.value)}
                                    onChange={(e) => setNewName(e.target.value)}
                                    key={"İsim"}
                                    name={"İsim"}
                                    style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                                <TextField id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: "400px" }}
                                    onInput={(e) => setNewDesc(e.target.value)}
                                    onChange={(e) => setNewDesc(e.target.value)}
                                    name={"Açıklama"}
                                    key={"Açıklama"}
                                    label="Açıklama" variant="outlined" />

                            </Stack>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField style={{ width: "100px", marginRight: "5px" }}
                                        onInput={(e) => setNewPrice(e.target.value)}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        name={"Fiyat"}
                                        key={"Fiyat"}
                                        inputProps={{ type: 'number' }} id="outlined-basic" label="Fiyat" variant="outlined" />

                                    <div>₺</div>
                                </div>
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                            <Button variant="outlined" onClick={() => {
                                    dispatch(newProductOperation({
                                        body: JSON.stringify({
                                            name: newName ? newName : null,
                                            description: newDesc ? newDesc : null,
                                            categoryId: newProductCatId,
                                            price: newtPrice ? newtPrice : null,
                                            image: file ? file : null,
                                            currency: 0
                                        })

                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getProduct({ productId: result.payload.data.id })).then((result) => {
                                                dispatch(getMenuList())
                                                dispatch(closeNewProduct())
                                                setFile(null);
                                                setChangeFile(false);
                                            });
                                        }
                                    });
                                }}  style={{ border: '2px solid #B6E2D3', color: '#167D7F' }} startIcon={<SaveIcon />}>
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

export default NewProduct