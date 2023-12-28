import React, { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import { closeCategoryEdit, updateCategoryOperation, getCategory, changeCategoryDetail } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const SubCategoryEdit = () => {
    const [inputCatName, setInputCatName] = React.useState("");
    const [inputCatDesc, setInputCatDesc] = React.useState("");

    const { categoryDetail} = useSelector(state => state.menu);

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
                open={categoryDetail !== null}
                onClose={() => dispatch(closeCategoryEdit())}
            >
                <Box sx={style}>
                    <Fade in={categoryDetail !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Kategoriyi Düzenle
                            </Typography>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <TextField
                                    onInput={(e) => setInputCatName(e.target.value)}
                                    onChange={(e) => setInputCatName(e.target.value)}
                                    key={"İsim"}
                                    defaultValue={categoryDetail?.name}
                                    name={"İsim"}
                                    style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                                     <TextField id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: "400px" }}
                                    onInput={(e) => setInputCatDesc(e.target.value)}
                                    onChange={(e) => setInputCatDesc(e.target.value)}
                                    defaultValue={categoryDetail?.description}
                                    name={"Açıklama"}
                                    key={"Açıklama"}
                                    label="Açıklama" variant="outlined" />
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <IconButton onClick={() => {
                                    dispatch(updateCategoryOperation({
                                        id: categoryDetail.id,
                                        topCategoryId: categoryDetail.topCategoryId,
                                        name: inputCatName ? inputCatName : categoryDetail.name,
                                        desc: inputCatDesc ? inputCatDesc : categoryDetail.description,
                                        image: categoryDetail.image,
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getCategory({categoryId: categoryDetail.id })).then((result) => {
                                                dispatch(changeCategoryDetail(result))
                                                dispatch(closeCategoryEdit(result))
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

export default SubCategoryEdit