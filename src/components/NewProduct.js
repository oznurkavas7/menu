import React from "react";
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import { closeNewProduct, newProductOperation, getProduct, changeProductDetail } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const NewProduct = () => {
    const [newName, setNewName] = React.useState("");
    const [newDesc, setNewDesc] = React.useState("");
    const [newtPrice, setNewPrice] = React.useState("");

    const { newProductCatId} = useSelector(state => state.menu);

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
                open={newProductCatId !== null}
                onClose={() => dispatch(closeNewProduct())}
            >
                <Box sx={style}>
                    <Fade in={newProductCatId !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Yeni Ürün
                            </Typography>
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
                                <TextField style={{ width: "100px" }}
                                    onInput={(e) => setNewPrice(e.target.value)}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    name={"Fiyat"}
                                    key={"Fiyat"}
                                    inputProps={{ type: 'number' }} id="outlined-basic" label="Fiyat" variant="outlined" />
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <IconButton onClick={() => {
                                    dispatch(newProductOperation({
                                        name: newName ? newName : null,
                                        desc: newDesc ? newDesc : null,
                                        categoryId: newProductCatId,
                                        price: newtPrice ? newtPrice : null,
                                        image: null,
                                        currency: 0
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getProduct({productId: result.payload.data.id })).then((result) => {
                                                dispatch(changeProductDetail(result))
                                                dispatch(closeNewProduct())
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

export default NewProduct