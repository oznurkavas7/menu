import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { closeMainCategoryEdit, updateMainCategoryOperation, getMainCategory, getMenuList } from '../redux/MenuSlice'
import {
    TextField, Typography, Box, FormControl, Stack, Modal, Fade, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const MainCategoryEdit = () => {
    const [mainCatName, setMainCatName] = React.useState("");
    const [mainCatDesc, setMainCatDesc] = React.useState("");

    const { mainCategoryDetail } = useSelector(state => state.menu);

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
                open={mainCategoryDetail !== null}
                onClose={() => dispatch(closeMainCategoryEdit())}
            >
                <Box sx={style}>
                    <Fade in={mainCategoryDetail !== null}>
                        <FormControl mt={1} >
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Ana Kategoriyi Düzenle
                            </Typography>
                            <Stack flexDirection='column' gap={1.5} mt={1}>
                                <TextField
                                    onInput={(e) => setMainCatName(e.target.value)}
                                    onChange={(e) => setMainCatName(e.target.value)}
                                    key={"İsim"}
                                    defaultValue={mainCategoryDetail?.name}
                                    name={"İsim"}
                                    style={{ width: "400px" }} id="outlined-basic" label="İsim" variant="outlined" />
                                <TextField id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: "400px" }}
                                    onInput={(e) => setMainCatDesc(e.target.value)}
                                    onChange={(e) => setMainCatDesc(e.target.value)}
                                    defaultValue={mainCategoryDetail?.description}
                                    name={"Açıklama"}
                                    key={"Açıklama"}
                                    label="Açıklama" variant="outlined" />
                            </Stack>
                            <Stack flexDirection='row' justifyContent={'flex-end'} gap={1.5} mt={1}>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(updateMainCategoryOperation({
                                        body: JSON.stringify({
                                            id: mainCategoryDetail.id,
                                            topCategoryId: mainCategoryDetail.topCategoryId,
                                            name: mainCatName ? mainCatName : mainCategoryDetail.name,
                                            description: mainCatDesc ? mainCatDesc : mainCategoryDetail.description,
                                        })
                                    })).then((result) => {
                                        if (result.payload) {
                                            dispatch(getMainCategory({ mainCategoryId: mainCategoryDetail.id })).then((result) => {
                                                dispatch(getMenuList())
                                                dispatch(closeMainCategoryEdit(result))
                                            });
                                        }
                                    });
                                }} style={{ border: '2px solid #B6E2D3', color: '#167D7F' }}
                                 startIcon={<SaveIcon />}>
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

export default MainCategoryEdit