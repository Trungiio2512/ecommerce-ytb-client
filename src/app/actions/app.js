import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apiCategories from "../../apis/category";
import * as apiBanner from "../../apis/banner";
import * as apiProduct from "../../apis/product";
import * as apiRam from "../../apis/ram";
import * as apiColor from "../../apis/color";
import * as apiInternal from "../../apis/internal";

export const getAllCategories = createAsyncThunk(
  "app/getAllCategories",
  async (data, { rejectWithValue }) => {
    const res = await apiCategories.getAll();
    //   console.log(res);
    if (!res?.sucess) {
      return rejectWithValue(res);
    }
    return res?.data;
  },
);
export const getBanner = createAsyncThunk("app/getBanner", async (data, { rejectWithValue }) => {
  const res = await apiBanner.get();
  //   console.log(res);
  if (!res?.sucess) {
    return rejectWithValue(res);
  }
  return res?.data;
});

export const getNewProducts = createAsyncThunk(
  "app/getNewProducts",
  async (data, { rejectWithValue }) => {
    const res = await apiProduct.getAll({
      news: true,
      fields: "thumb specifications title slug price totalRatings news priceSale description",
      limit: 50,
    });
    // console.log(res);
    if (!res?.sucess) {
      return rejectWithValue(res);
    }
    return res?.data;
  },
);

export const get = createAsyncThunk("app/get", async (data, { rejectWithValue }) => {
  const [categories, banners, newProducts, rams, colors, internals] = await Promise.all([
    await apiCategories.getAll(),
    await apiBanner.get(),

    await apiProduct.getAll({
      news: true,
      fields: "thumb specifications title slug price totalRatings news priceSale description",
      limit: 50,
    }),
    await apiRam.get(),
    await apiColor.get(),
    await apiInternal.get(),
  ]);

  return {
    categories: categories?.data,
    banners: banners?.data,
    newProducts: newProducts?.data,
    rams: rams?.data,
    colors: colors?.data,
    internals: internals?.data,
  };
});
