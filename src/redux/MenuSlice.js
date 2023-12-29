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
    productDel: false
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

export const newProductOperation = createAsyncThunk(
    'gets/newProductOperation',
    async ({ name, desc, categoryId, price, image, currency }, { getState }) => {
        const state = getState();
        const res = await fetch('https://192.168.1.105/api/Products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
            body: JSON.stringify({
                name: name,
                description: desc,
                categoryId: categoryId,
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

export const updateCategoryOperation = createAsyncThunk(
    'gets/updateCategoryOperation',
    async ({ id, topCategoryId, name, desc, image }, { getState }) => {
        const state = getState();
        const res = await fetch('https://192.168.1.105/api/Categories/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
            body: JSON.stringify({
                id: id,
                topCategoryId: topCategoryId,
                name: name,
                description: desc,
                image: image
            })
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const deleteProduct = createAsyncThunk(
    'gets/deleteProduct',
    async ({ id, categoryId}, { getState }) => {
        const state = getState();
        const res = await fetch('https://192.168.1.105/api/Products/remove', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
            body: JSON.stringify({
                id: id,
                categoryId: categoryId,
            })
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const getProduct = createAsyncThunk(
    'gets/getProduct',
    async ({ productId }, { getState }) => {
        const state = getState();
        const res = await fetch(`https://192.168.1.105/api/Products/get?productId=${productId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.menu.token.token}` },
        }).then(
            (data) => data.json()
        )
        return res
    }
);

export const getCategory = createAsyncThunk(
    'gets/getCategory',
    async ({ categoryId }, { getState }) => {
        const state = getState();
        const res = await fetch(`https://192.168.1.105/api/Categories/get?categoryId=${categoryId}`, {
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
    });

const updateMenuList = (state, action, updateFunction) => {
    return {
        ...state.menuList,
        data: {
            ...state.menuList.data,
            root: state.menuList.data.root.map(category => {
                return {
                    ...category,
                    subCategories: category.subCategories.map(subCategory => {
                        return updateFunction(subCategory, action);
                    }),
                };
            }),
        },
    };
};

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
        closeNewProduct: (state) => {
            state.newProductCatId = null
            state.productDetail = null
        },
        openNewProductWind: (state, action) => {
            state.newProductCatId = action.payload
        },
        removeProduct: (state, action) => {
            state.productDel = false

            const updatedMenuList = updateMenuList(state, action, subCategory => {
                return {
                    ...subCategory,
                    products:subCategory.products.filter((product) => product.id !== action.payload.id)
                };
            });

            state.menuList = updatedMenuList;
        },
        changeProductDetail: (state, action) => {
            state.productDetail = action.payload.payload.data;
          
            const updatedMenuList = updateMenuList(state, action, subCategory => {
              const updatedProducts = subCategory.products.map(item => {
                if (item.id === action.payload.payload.data.id) {
                  return action.payload.payload.data;
                }
                return item;
              });
          
              if (subCategory.id === action.payload.payload.data.categoryId) {
                
                let updateProduct = {};
                var findProduct = updatedProducts.find(product => product.id === action.payload.payload.data.id)
                findProduct ? updateProduct = {
                  ...subCategory,
                  products: updatedProducts,
                } : updateProduct = {
                    ...subCategory,
                  products: [...updatedProducts, action.payload.payload.data],
                }

                return updateProduct;
              }
          
              return subCategory;
            });
          
            state.menuList = updatedMenuList;
          },
    
        changeCategoryDetail: (state, action) => {
            state.categoryDetail = action.payload.payload.data;

            const updatedMenuList = updateMenuList(state, action, (subCategory, action) => {
                if (subCategory.id === action.payload.payload.data.id) {
                    return {
                        ...subCategory,
                        ...action.payload.payload.data,
                    };
                }
                return subCategory;
            });

            state.menuList = updatedMenuList;
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
            .addCase(updateCategoryOperation.fulfilled, (state, action) => {
                state.categoryUpdateStatus = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                !(action.payload.isDel) && (state.productDetail = action.payload.data)
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryDetail = action.payload.data
            })
            .addCase(newProductOperation.fulfilled, (state, action) => {
                state.newProductStatus = true
                state.newProduct = action.payload.data
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.productDel = true
            })
    }
});

// Action creators are generated for each case reducer function
export const { closeCategoryEdit, 
    closeProductEdit, 
    changeProductDetail, 
    changeCategoryDetail, 
    closeNewProduct, 
    openNewProductWind, 
    removeProduct } = MenuSlice.actions

export default MenuSlice.reducer