import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { MultiSelect } from "react-multi-select-component";

import * as apiCategories from "../../apis/category";
import * as apiBrands from "../../apis/brand";
import { toastMsg } from "../../until/toast";
import { Modal, FormInput } from "../../components";
import { uploadImage } from "../../until/fn";

const ManagerBrand = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [brands, setbrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cateSelected, setcateSeleted] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({
    url: "",
    filename: "",
  });

  useEffect(() => {
    const fetchApi = async () => {
      const [categories, brands] = await Promise.all([
        await apiCategories.getAll(),
        await apiBrands.get(),
      ]);
      setCategory(categories.data.map((brand) => ({ label: brand?.title, value: brand._id })));
      setbrands(brands.data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const { filename, url } = await uploadImage(file);
    toastMsg("Upload thumbnail successfully", "success");
    setImage((prev) => ({
      ...prev,
      filename,
      url,
    }));
  };
  const hanldeCreate = async () => {
    if (!title || brands.length <= 0 || !image.url) {
      toastMsg("Please enter values for category", "warning");
    } else {
      const rs = await apiCategories.create({
        title,
        image,
        brands: cateSelected.map((ele) => ele.value),
      });
      if (rs.sucess) {
        toastMsg(rs.msg, "success");
        setIsOpen(false);
        setCategory((prev) => [...prev, rs.data]);
        setTitle("");
        setcateSeleted([]);
        setImage({
          url: "",
          filename: "",
        });
      } else {
        toastMsg(rs.msg, "error");
      }
    }
  };
  const handleDelete = async (pcid) => {
    const rs = await apiCategories.deletePc(pcid);
    if (rs.sucess) {
      toastMsg(rs.msg, "success");
      setCategory((prev) => prev.filter((pc) => pc?._id !== pcid));
    } else {
      toastMsg(rs.msg, "error");
    }
  };
  const hanldeValue = async (data) => {
    setcateSeleted(() => data.categories.map((ele) => ({ label: ele.title, value: ele?._id })));
    setTitle(data.title);
    if (data.image?.url) {
      setImage({ url: data.image.url, filename: data.image.filename });
    } else {
      setImage({ url: data.image, filename: "" });
    }
    setIsOpen(true);
  };
  return (
    <div className="w-full  xs:px-5 py-2 md:hidden max-xs:px-2">
      <h2 className="text-xl text-third font-medium  mb-5">Manager Category</h2>
      <button
        className="text-base text-third bg-blue-200 border border-blue-400 rounded-lg px-5 py-2 sm:w-[200px] w-full mb-5"
        onClick={() => setIsOpen(true)}
      >
        Create brand
      </button>
      {brands.length > 0 ? (
        <>
          <div className="sm:block hidden">
            {" "}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>{" "}
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={brand?._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                      >
                        {brand?.title}
                      </th>{" "}
                      <td className="px-6 py-4">
                        <div className="w-[100px] h-[100px]">
                          <figure className="w-full h-full">
                            <img src={brand?.image?.url ? brand?.image.url : brand?.image} alt="" />
                          </figure>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <Tippy
                            placement="bottom-end"
                            delay={[200, 300]}
                            render={(attrs) => (
                              <div
                                className="min-w-[100px] bg-white animate-scale-up-tr border border-gray-300 rounded-md p-2"
                                tabIndex="-1"
                                {...attrs}
                              >
                                {brand?.categories.length > 0 ? (
                                  <ul>
                                    {brand?.categories.map((ele, index) => (
                                      <li className="text-sm text-gray-400" key={ele?._id}>
                                        {ele.title}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-sm text-third">Has not categories</span>
                                )}
                              </div>
                            )}
                          >
                            <span className="text-white text-sm cursor-pointer">
                              {brand?.categories.length} category
                            </span>
                          </Tippy>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="px-3 py-1 bg-white text-third rounded-md active:bg-red-300"
                            onClick={() => handleDelete(brand?._id)}
                          >
                            Delete
                          </button>
                          <button
                            className={`bg-green-400  px-3 py-1 rounded-md text-white`}
                            onClick={() => hanldeValue(brand)}
                          >
                            change
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden block">
            <div className="grid-layout">
              <div className="row">
                {brands.map((brand) => {
                  return (
                    <div className="col c-12 mb-4" key={brand?._id}>
                      <div className="w-full p-3 bg-white border border-gray-300 rounded-sm">
                        <h2 className="text-base text-third font-normal mb-2">{brand.title}</h2>
                        <div className="flex max-[300px]:flex-col items-start gap-4">
                          <div className="w-[100px] h-[100px] shrink-0">
                            <figure className="w-full h-full">
                              <img
                                src={brand?.image?.url ? brand?.image.url : brand?.image}
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="flex flex-col gap-2 flex-1 w-fullj">
                            <div>
                              {" "}
                              <Tippy
                                placement="right-start"
                                delay={[200, 300]}
                                render={(attrs) => (
                                  <div
                                    className="min-w-[120px] bg-white animate-scale-up-tr border border-gray-300 rounded-md p-2"
                                    tabIndex="-1"
                                    {...attrs}
                                  >
                                    {brand.categories.length > 0 ? (
                                      <ul>
                                        {brand?.categories.map((ele, index) => (
                                          <li className="text-sm text-gray-400" key={ele?._id}>
                                            {ele.title}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <span className="text-sm text-third">Has not categories</span>
                                    )}
                                  </div>
                                )}
                              >
                                <span className="text-third text-sm cursor-pointer">
                                  {brand?.categories.length} brand
                                </span>
                              </Tippy>
                            </div>
                            <div className="flex sm:flex-row w-full flex-col gap-2 sm:items-center">
                              {" "}
                              <button className="px-3 py-1 bg-white text-third rounded-md border border-gray-300 active:bg-red-300 sm:w-auto w-full">
                                Delete
                              </button>
                              <button
                                className={`bg-green-400  px-3 py-1 rounded-md text-white sm:w-auto w-full`}
                                onClick={() => hanldeValue(brand)}
                              >
                                change
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3 className="text-lg text-red-400 font-medium">Not exists categories</h3>
      )}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div className="w-full h-full flex flex-col gap-5">
          <FormInput
            label={"Title"}
            classNameLabel={"sm:mr-2 text-sm text-third w-[100px]"}
            className={
              "text-sm px-5 py-2 border border-gray-300 bg-gray-100 rounded-md outline-none focus:border-blue-300  max-sm:w-full"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex lg:items-start lg:flex-row flex-col gap-2">
            <label className="text-sm w-[100px] text-third">Brands</label>
            <MultiSelect
              options={category}
              value={cateSelected}
              className="flex-1"
              onChange={setcateSeleted}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-third">Thumnail</label>
            <div className="max-w-[300px] w-full">
              <figure className="w-full h-full">
                <img
                  src={
                    image?.url ||
                    "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
                  }
                  alt=""
                />
              </figure>
            </div>
            <FormInput type="file" onChange={handleUploadImage} />
          </div>
          <button
            className="sm:w-[300px] w-full px-5 py-2 border border-blue-500 rounded-md bg-blue-100 text-third text-sm"
            onClick={hanldeCreate}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

ManagerBrand.propTypes = {};

export default ManagerBrand;
