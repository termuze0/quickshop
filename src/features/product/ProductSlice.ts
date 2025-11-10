import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";

interface ProductsState {
  items: Product[];
  favorites: Product[];
  search: string;
  skip: number;
  loading: boolean;
  hasMore: boolean;
}

const initialState: ProductsState = {
  items: [],
  favorites: [],
  search: "",
  skip: 0,
  loading: false,
  hasMore: true,
};

export const fetchProductsThunk = createAsyncThunk(
  "products/fetch",
  async ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
    return await fetchProducts(limit, skip);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.find((p) => p.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter((p) => p.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.items = [];
      state.skip = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.items = [...state.items, ...action.payload];
      state.skip += action.payload.length;
      state.hasMore = action.payload.length > 0;
      state.loading = false;
    });
    builder.addCase(fetchProductsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { toggleFavorite, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;
