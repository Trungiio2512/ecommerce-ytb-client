import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify";

import * as apiCategories from "../../apis/category";
import * as apiBanner from "../../apis/banner";
import * as apiRam from "../../apis/ram";
import * as apiColor from "../../apis/color";
import * as apiInternal from "../../apis/internal";
import * as apiBrand from "../../apis/brand";
import * as apiProduct from "../../apis/product";
import path from "../../until/path";
import { FormInput } from "../../components";
import { validateProduct } from "../../until/joiSchema";
import { toastMsg } from "../../until/toast";
import { uploadImage } from "../../until/fn";

const CreateProduct = (props) => {
  const navigate = useNavigate();
  const [color, setcolor] = useState([]);
  const [ram, setram] = useState([]);
  const [internal, setInternal] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [brands, setbrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSale, setPriceSale] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [rams, setramS] = useState([]);
  const [internals, setinterals] = useState([]);
  const [colors, setColors] = useState([]);
  const [deal, setDeal] = useState(false);
  const [features, setFeatures] = useState(false);
  const [news, setNews] = useState(false);
  const [specifications, setSpecifications] = useState("");
  const [description, setDescription] = useState("");
  const [warranty, setWarranty] = useState("");
  const [payment, setPayment] = useState("");
  const [delivery, setdelivery] = useState("");
  const [thumb, setthumb] = useState(null);
  const [images, setImages] = useState([]);

  const createProduct = async () => {
    const { error, value } = validateProduct({
      title,
      price,
      quantity,
      rams: rams.map((ele) => ele.value),
      internals: internals.map((ele) => ele.value),
      colors: colors.map((ele) => ele.value),
      brand,
      category,
      thumb,
      images,
    });
    if (error?.details) {
      toastMsg(error.message, "warning");
    } else {
      const rs = await apiProduct.create({
        ...value,
        priceSale,
        deal,
        features,
        news,
        specifications,
        description,
        warranty,
        payment,
        delivery,
      });
      if (rs.sucess) {
        toastMsg(rs.msg, "success");
        navigate(`/${path.ADMIN}/${path.MANAGER_PRODUCT}`);
      } else {
        toastMsg(rs.msg, "error");
      }
    }
  };
  const handleThumb = async (e) => {
    setLoading(true);
    try {
      const file = e.target.files[0];
      const { filename, url } = await uploadImage(file);
      toastMsg("Upload thumbnail successfully", "success");
      setthumb({ filename, url });
      setLoading(false);
    } catch (error) {
      toastMsg(error, "error");
      setLoading(false);
    }
  };
  const hanldeImages = async (e) => {
    setLoading(true);
    try {
      let arr = [];
      const file = e.target.files;
      for (let i = 0; i < file.length; i++) {
        const { filename, url } = await uploadImage(file[i]);
        arr.push({ filename, url });
      }
      toastMsg("Upload images successfully", "success");
      setImages(arr);
      setLoading(false);
    } catch (error) {
      toastMsg(error, "error");
      setLoading(false);
    }
  };
  const handleRemoveImage = (filename) => {};

  useEffect(() => {
    const fetchApi = async () => {
      const [categories, ram, color, internal, brands] = await Promise.all([
        await apiCategories.getAll(),
        await apiRam.get(),
        await apiColor.get(),
        await apiInternal.get(),
        await apiBrand.get(),
      ]);
      setCategorys(categories.data);
      setbrands(brands.data);
      setram(ram.data.map((cate) => ({ label: cate?.name, value: cate?._id })));
      setcolor(color.data.map((cate) => ({ label: cate?.name, value: cate?._id })));
      setInternal(internal.data.map((cate) => ({ label: cate?.name, value: cate?._id })));
    };
    fetchApi();
  }, []);

  return (
    <div className="w-full h-full p-2 sm:p-5">
      <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center mb-5">
        <h2 className="text-xl text-third font-medium sm:mb-0 mb-5 e">Create Product</h2>
        <Link
          className="px-5 py-2 text-whit rounded-md bg-blue-300 sm:w-auto w-full"
          to={`/${path.ADMIN}/${path.MANAGER_PRODUCT}`}
        >
          Manager product
        </Link>
      </div>

      <div className="flex md:flex-row flex-col md:items-start gap-5 mb-3">
        <div className="flex-1 flex flex-col gap-5">
          <FormInput
            classNameLabel={"text-sm text-third"}
            label={"Title"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={
              "w-full flex-1 text-base text-third outline-none border border-gray-300 focus:border-blue-300 px-5 py-1"
            }
          />
          <FormInput
            classNameLabel={"text-sm text-third"}
            label={"Price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={
              "w-full flex-1 text-base text-third outline-none border border-gray-300 focus:border-blue-300 px-5 py-1"
            }
            type="number"
          />
          <FormInput
            classNameLabel={"text-sm text-third"}
            label={"Price Sale"}
            className={
              "w-full flex-1 text-base text-third outline-none border border-gray-300 focus:border-blue-300 px-5 py-1"
            }
            value={priceSale}
            onChange={(e) => setPriceSale(e.target.value)}
            type="number"
          />
          <FormInput
            classNameLabel={"text-sm text-third"}
            label={"Quantity"}
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
            className={
              "w-full flex-1 text-base text-third outline-none border border-gray-300 focus:border-blue-300 px-5 py-1"
            }
          />
          <div className="flex flex-col items-start">
            <h2 className="text-sm text-third mb-2">Brand</h2>

            {brands.length > 0 && (
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option defaultValue>Choose a country</option>
                {brands.map((brand) => {
                  return (
                    <option value={brand?._id} key={brand?._id}>
                      {brand?.title}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm text-third mb-2">Category</h2>

            {categorys.length > 0 && (
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue>Choose a category</option>
                {categorys.map((cate) => {
                  return (
                    <option value={cate?._id} key={cate?._id}>
                      {cate?.title}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-sm text-third mb-2">Ram</h2>
            <MultiSelect
              className="w-full"
              options={ram}
              value={rams}
              onChange={setramS}
              labelledBy="Select"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm text-third mb-2">Color</h2>
            <MultiSelect
              className="w-full"
              options={color}
              value={colors}
              onChange={setColors}
              labelledBy="Select"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-sm text-third mb-2">Internal</h2>
            <MultiSelect
              className="w-full"
              options={internal}
              value={internals}
              onChange={setinterals}
              labelledBy="Select"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"Not news"}
              name="notnews"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              onChange={() => setNews(!news)}
              checked={!news}
            />
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"News"}
              name="new"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              checked={news}
              onChange={() => setNews(!news)}
            />
          </div>
          <div className="flex items-center gap-5">
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"Not Deal"}
              name="notdeal"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              onChange={() => setDeal(!deal)}
              checked={!deal}
            />
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"Deal"}
              name="deal"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              onChange={() => setDeal(!deal)}
              checked={deal}
            />
          </div>
          <div className="flex items-center gap-5">
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"Not Features"}
              name="notfeatures"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              onChange={() => setFeatures(!features)}
              checked={!features}
            />
            <FormInput
              classNameLabel={"text-sm font-medium text-gray-900 "}
              label={"Features"}
              name="features"
              className={
                "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              }
              type="radio"
              onChange={() => setFeatures(!features)}
              checked={features}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <label className="text-sm text-third">Description</label>
            <textarea
              className="w-full flex-1 border border-gray-300 p-5 outline-none focus:border-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <label className="text-sm text-third">Payment</label>
            <textarea
              className="w-full flex-1 border border-gray-300 p-5 outline-none focus:border-blue-300"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <label className="text-sm text-third">Delivery</label>
            <textarea
              className="w-full flex-1 border border-gray-300 p-5 outline-none focus:border-blue-300"
              value={delivery}
              onChange={(e) => setdelivery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <label className="text-sm text-third">Warranty</label>
            <textarea
              className="w-full flex-1 border border-gray-300 p-5 outline-none focus:border-blue-300"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mb-5">
        <h2 className="text-sm text-third mb-2">Thumb</h2>
        <figure className="w-[200px] h-[200px] mb-4">
          <img
            src={
              thumb?.url ||
              "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
            }
            alt=""
          />
        </figure>
        <FormInput type="file" onChange={handleThumb} />
      </div>
      <div className="flex flex-col items-start">
        <h2 className="text-sm text-third mb-2">Image Preview</h2>
        {images.length <= 0 ? (
          <figure className="w-[200px] h-[200px] mb-4">
            <img
              src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
              alt=""
            />
          </figure>
        ) : (
          <div className="flex ic gap-2 mb-4 overflow-x-auto">
            {images.map((ele, index) => {
              return (
                <figure className="w-[200px] h-[200px]" key={index}>
                  <img src={ele.url} alt="" />
                </figure>
              );
            })}
          </div>
        )}
        <FormInput type="file" multiple onChange={hanldeImages} />
      </div>
      <button
        className="px-5 py-2 w-full my-5 bg-green-300 text-white rounded-md sm:w-[200px] outline-none"
        onClick={() => createProduct()}
      >
        Create
      </button>
    </div>
  );
};

CreateProduct.propTypes = {};

export default CreateProduct;
