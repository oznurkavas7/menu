import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [],
    productDetail: null,
    productUpdateStatus: false,
    categoryDetail: null,
    categoryUpdateStatus: false,
    newProduct: null,
    newProductStatus: false,
    newProductCatId: null,
    productDel: false,
    mainCategoryDetail: null,
    mainCategoryUpdateStatus: false,
    newSubCatId: null,
    subCatDel: false
}

const baseApiUrl = "http://192.168.1.107/api/"
const headers = { 'Content-Type': 'application/json', 'Authorization': initialState.token ? `Bearer ${initialState.token.token}` : null}

/************* LOGIN **********************/
export const loginOperation = createAsyncThunk(
    'gets/loginOperation',
    async ({ name, pass }) => {
        const res = await fetch(`${baseApiUrl}Auth/login`, {
            method: 'POST',
            headers: headers,
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
/************* LOGIN **********************/

/************* POST **********************/
const createAsyncThunkForAdd = (apiEndpoint) => {
    return createAsyncThunk(
        `gets/new${apiEndpoint}Operation`,
        async ({ body }, { getState }) => {
            const res = await fetch(`${baseApiUrl}${apiEndpoint}/add`, {
                method: 'POST',
                headers: headers,
                body: body
            }).then(
                (data) => data.json()
            );
            return res;
        }
    );
};

export const newProductOperation = createAsyncThunkForAdd('Products');
export const newSubCatOperation = createAsyncThunkForAdd('Categories');
/************* POST **********************/

/************* UPDATE **********************/
const createAsyncThunkForUpdate = (apiEndpoint) => {
    return createAsyncThunk(
        `gets/update${apiEndpoint}Operation`,
        async ({ body }, { getState }) => {
            const res = await fetch(`${baseApiUrl}${apiEndpoint}/update`, {
                method: 'PUT',
                headers: headers,
                body: body
            }).then(
                (data) => data.json()
            );
            return res;
        }
    );
};

export const updateProductOperation = createAsyncThunkForUpdate('Products');
export const updateCategoryOperation = createAsyncThunkForUpdate('Categories');

export const updateMainCategoryOperation = createAsyncThunk(
    'gets/updateMainCategoryOperation',
    async ({ body }, { getState }) => {
        const res = await fetch(`${baseApiUrl}Categories/update`, {
            method: 'PUT',
            headers: headers,
            body: body
        }).then(
            (data) => data.json()
        )
        return res
    }
);
/************* UPDATE **********************/

/************* DELETE **********************/
const createAsyncThunkForDelete = (apiEndpoint) => {
    return createAsyncThunk(
        `gets/delete${apiEndpoint}`,
        async ( { body }, { getState }) => {
            const res = await fetch(`${baseApiUrl}${apiEndpoint}/remove`, {
                method: 'DELETE',
                headers: headers,
                body: body
            }).then(
                (data) => data.json()
            );
            return res;
        }
    );
};

export const deleteProduct = createAsyncThunkForDelete('Products');
export const deleteSubCat = createAsyncThunkForDelete('Categories');
/************* DELETE **********************/

/************* GET **********************/
const createAsyncThunkForGet = (apiEndpoint, queryParam) => {
    return createAsyncThunk(
        `gets/get${apiEndpoint}`,
        async ({ [queryParam]: id }, { getState }) => {
            const res = await fetch(`${baseApiUrl}${apiEndpoint}/get?${queryParam}=${id}`, {
                method: 'GET',
                headers: headers,
            }).then(
                (data) => data.json()
            );
            return res;
        }
    );
};

export const getProduct = createAsyncThunkForGet('Products', 'productId');
export const getCategory = createAsyncThunkForGet('Categories', 'categoryId');
export const getMenuList = createAsyncThunk('gets/getMenuList', async (arg, { getState }) => {
    const res = await fetch(`${baseApiUrl}QR/qrmenucategorieswithproduct`, {
        method: 'GET',
        headers: headers,
    }).then(
        (data) => data.json()
    );
    return res;
});

export const getMainCategory = createAsyncThunk(
    'gets/getMainCategory',
    async ({ mainCategoryId }, { getState }) => {
        const res = await fetch(`${baseApiUrl}Categories/get?categoryId=${mainCategoryId}`, {
            method: 'GET',
            headers: headers,
        }).then(
            (data) => data.json()
        )
        return res
    }
)
/************* GET **********************/

export const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        closeProductEdit: (state) => {
            state.productDetail = null
        },
        closeCategoryEdit: (state) => {
            state.categoryDetail = null
        },
        closeMainCategoryEdit: (state) => {
            state.mainCategoryDetail = null
        },
        closeNewProduct: (state) => {
            state.newProductCatId = null
            state.productDetail = null
        },
        openNewProductWind: (state, action) => {
            state.newProductCatId = action.payload
        },
        closeNewSubCat: (state) => {
            state.newSubCatId = null
            state.categoryDetail = null
        },
        openNewSubCatWind: (state, action) => {
            state.newSubCatId = action.payload
        } 
    },
    extraReducers: (builder) => {
        const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    
        builder
            .addCase(loginOperation.fulfilled, (state, action) => {
                state.token = action.payload;
                setLocalStorage('token', state.token);
            })
            .addCase(getMenuList.fulfilled, (state, action) => {
                state.menuList = action.payload;
                setLocalStorage('menuList', state.menuList);
            })
            .addCase(updateProductOperation.fulfilled, (state) => {
                state.productUpdateStatus = true;
            })
            .addCase(updateCategoryOperation.fulfilled, (state) => {
                state.categoryUpdateStatus = true;
            })
            .addCase(updateMainCategoryOperation.fulfilled, (state) => {
                state.mainCategoryUpdateStatus = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                if (!action.payload.isDel) state.productDetail = action.payload.data;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryDetail = action.payload.data;
            })
            .addCase(getMainCategory.fulfilled, (state, action) => {
                state.mainCategoryDetail = action.payload.data;
            })
            .addCase(newProductOperation.fulfilled, (state, action) => {
                state.newProductStatus = true;
                state.newProduct = action.payload.data;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.productDel = true;
            })
            .addCase(deleteSubCat.fulfilled, (state) => {
                state.subCatDel = true;
            });
    }
});

// Action creators are generated for each case reducer function
export const { 
    closeCategoryEdit,
    closeProductEdit,
    closeNewProduct,
    openNewProductWind,
    closeMainCategoryEdit,
    closeNewSubCat,
    openNewSubCatWind,
} = MenuSlice.actions

export default MenuSlice.reducer