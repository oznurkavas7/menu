import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [],
    productDetail: null,
    productUpdateStatus: false,
    categoryDetail: null,
    categoryUpdateStatus: false
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

export const updateCategoryOperation = createAsyncThunk(
    'gets/updateCategoryOperation',
    async ({ id,topCategoryId, name, desc, image }, { getState }) => {
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
    })

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
        changeProductDetail: (state, action) => {
            state.productDetail = action.payload.payload.data
          
            const updatedMenuList = {
              ...state.menuList,
              data: {
                ...state.menuList.data,
                root: state.menuList.data.root.map(category => {
                  return {
                    ...category,
                    subCategories: category.subCategories.map(subCategory => {
                      return {
                        ...subCategory,
                        products: subCategory.products.map(item => {
                          if (item.id === action.payload.payload.data.id) {
                            return action.payload.payload.data;
                          }
                          return item;
                        }),
                      };
                    }),
                  };
                }),
              },
            };
          
            state.menuList = updatedMenuList
          },
          changeCategoryDetail: (state, action) => {
            state.categoryDetail = action.payload.payload.data

            const updatedMenuList = {
                ...state.menuList,
                data: {
                  ...state.menuList.data,
                  root: state.menuList.data.root.map(category => {
                    return {
                      ...category,
                      subCategories: category.subCategories.map(subCategory => {
                        if (subCategory.id === action.payload.payload.data.id) {
                          return {
                            ...subCategory,
                            ...action.payload.payload.data,
                          };
                        }
                        return subCategory;
                      }),
                    };
                  }),
                },
              };
              
              state.menuList = updatedMenuList;
          }
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
                state.productDetail = action.payload.data
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryDetail = action.payload.data
            })
          
    }
});

// Action creators are generated for each case reducer function
export const { closeCategoryEdit, closeProductEdit, changeProductDetail, changeCategoryDetail } = MenuSlice.actions

export default MenuSlice.reducer