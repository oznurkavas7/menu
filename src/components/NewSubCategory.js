import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { closeNewSubCat, newSubCatOperation, getCategory, getMenuList } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const NewSubCategory = () => {
    const [newSubCatName, setNewSubCatName] = React.useState("");
    const [newSubCatDesc, setNewSubCatDesc] = React.useState("");

    const { newSubCatId } = useSelector(state => state.menu);

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
                open={newSubCatId !== null}
                onClose={() => dispatch(closeNewSubCat())}
            >
                <Box sx={style}>
                    <Fade in={newSubCatId !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Yeni Alt Kategori
                            </Typography>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <TextField
                                    onInput={(e) => setNewSubCatName(e.target.value)}
                                    onChange={(e) => setNewSubCatName(e.target.value)}
                                    key={"İsim"}
                                    name={"İsim"}
                                    style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                                <TextField id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: "400px" }}
                                    onInput={(e) => setNewSubCatDesc(e.target.value)}
                                    onChange={(e) => setNewSubCatDesc(e.target.value)}
                                    name={"Açıklama"}
                                    key={"Açıklama"}
                                    label="Açıklama" variant="outlined" />
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(newSubCatOperation({
                                        body: JSON.stringify({
                                            name: newSubCatName ? newSubCatName : null,
                                            description: newSubCatDesc ? newSubCatDesc : null,
                                            topCategoryId: newSubCatId,
                                            image: null
                                        })
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getCategory({ categoryId: result.payload.data.id })).then((result) => {
                                                dispatch(getMenuList())
                                                dispatch(closeNewSubCat())
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

export default NewSubCategory