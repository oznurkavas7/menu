import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [],
    productDetail: null,
    productUpdateStatus: false,
    getOneProduct: false
}

export const loginOperation = createAsyncThunk(
    'gets/loginOperation',
    async ({ name, pass }) => {
        const res = await fetch('https://192.168.1.105/api/Auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: name,
                password: pass
            })
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const updateProductOperation = createAsyncThunk(
    'gets/updateProductOperation',
    async ({ id, categoryId, name, desc, price, image, currency }, { getState }) => {
        const state = getState();
        const res = await fetch('https://192.168.1.105/api/Products/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
            body: JSON.stringify({
                id: id,
                categoryId: categoryId,
                name: name,
                description: desc,
                price: price,
                image: image,
                currency: currency
            })
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const getProduct = createAsyncThunk(
    'gets/getProduct',
    async ({ categoryId }, { getState }) => {
        debugger
        const state = getState();
        const res = await fetch(`https://192.168.1.105/api/Products/getall?categoryId=${categoryId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const getMenuList = createAsyncThunk(
    'gets/getMenuList',
    async (arg, { getState }) => {
        const state = getState();
        const res = await fetch('https://192.168.1.105/api/QR/qrmenucategorieswithproduct', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
        }).then(
            (data) => data.json()
        )
        return res
    })

export const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openProductEdit: (state, action) => {
            state.productDetail = action.payload
        },
        closeProductEdit: (state) => {
            state.productDetail = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginOperation.fulfilled, (state, action) => {
                state.token = action.payload;
                localStorage.setItem('token', JSON.stringify(state.token))
            })
            .addCase(getMenuList.fulfilled, (state, action) => {
                state.menuList = action.payload;
                localStorage.setItem('menuList', JSON.stringify(state.menuList))
            })
            .addCase(updateProductOperation.fulfilled, (state, action) => {
                state.productUpdateStatus = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.getOneProduct = true;
            })
    }
});

// Action creators are generated for each case reducer function
export const { openProductEdit, closeProductEdit } = MenuSlice.actions

export default MenuSlice.reducer