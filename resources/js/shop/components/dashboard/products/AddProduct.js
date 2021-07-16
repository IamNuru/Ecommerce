import React, { useContext, useState, useEffect } from "react";
import ProductsContext from "../../context/products/ProductsContext";

const AddProduct = () => {
  const {
    product,
    errors,
    addProduct,
    updateProduct,
    categories,
    success,
    getCategories,
    setProductToNull,
    clearMessages,
    formloading,
    setFormLoading
  } = useContext(ProductsContext);

  //set data state
  const [data, setData] = useState({
    title: "",
    price: "",
    deductions: "",
    description: "",
    qty: "",
  });

  const [category, setCategory] = useState("");
  const [image_name, setImageName] = useState("");
  const [update, setUpdate] = useState(false);

  const newRecord = () => {
    setUpdate(false);
    setProductToNull();
    setData({
      title: "",
      price: "",
      deductions: "",
      description: "",
      qty: "",
    });
  };

  //destructure data state
  const { title, price, deductions, description, qty } = data;

 
  useEffect(() => {
    getCategories();
    clearMessages();
    setFormLoading(false)

    // eslint-disable-next-line
  }, []);

  //on input change
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //When category is selected
  const onCategorySelect = (e) => {
    setCategory(e.target.value);
  };

  //on File change
  const onFileChange = (e) => {
    setImageName(e.target.files[0]);
  };

  useEffect(() => {
    if (product) {
      setData({
        title: product.title,
        price: product.price,
        deductions: product.deduction,
        description: product.description,
        qty: product.qty,
        image_name: product.image_name,
      });
      setCategory(product.category_id);
      setUpdate(true);
    }

    // eslint-disable-next-line
  }, [product]);

  //clear form on success
  if (success) {
    setTimeout(() => {
      setData({
        title: "",
        price: "",
        deductions: "",
        description: "",
        qty: "",
      });
    }, 500);
  }

  //clear inputs when you get success message
  useEffect(() => {
    setTimeout(() => {
      clearMessages();
    }, 5000);
    // eslint-disable-next-line
  }, [success]);

  // on submit
  const onSubmit = (e) => {
    e.preventDefault();
    clearMessages();
    if (category === "") {
      alert("please select a category");
      return false;
    } else {
      setFormLoading(true)
      //declare form data
      var formData = new FormData();
      //append fields to form data
      formData.append("title", title);
      formData.append("price", price);
      formData.append("qty", qty);
      formData.append("deductions", deductions);
      formData.append("image_name", image_name);
      formData.append("category", category);
      formData.append("description", description);
      //if in update mode
      if (update) {
        updateProduct(product.id, formData);
      } else {
        addProduct(formData);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="block  md:px-4 px-8 pb:8"
    >
      <div className="w-full grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="block">
          <label htmlFor="Title" className="text-md text-gray-800 py-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={onChange}
            value={title}
            required
            className={`${errors?.title &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.title && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.title}
            </label>
          )}
        </div>
        <div className="block">
          <label className="text-md text-gray-800 py-1">Price</label>
          <input
            type="text"
            name="price"
            onChange={onChange}
            value={price}
            required
            className={`${errors?.price &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.price && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.price}
            </label>
          )}
        </div>
        <div className="block">
          <label className="text-md text-gray-800">Deductions</label>
          <input
            type="text"
            name="deductions"
            onChange={onChange}
            value={deductions}
            className={`${errors?.deductions &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.deductions && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.deductions}
            </label>
          )}
        </div>
        <div className="block">
          <label className="text-md text-gray-800">Description</label>
          <textarea
            type="text"
            name="description"
            onChange={onChange}
            value={description}
            required
            className={`${errors?.description &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          ></textarea>
          {errors?.description && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.description}
            </label>
          )}
        </div>
        <div className="block">
          <label className="text-md text-gray-800">Qty</label>
          <input
            type="number"
            name="qty"
            onChange={onChange}
            value={qty}
            required
            className={`${errors?.qty &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.qty && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.qty}
            </label>
          )}
        </div>
        <div className="block">
          <label className="text-md text-gray-800">Select Category</label>
          <select
            value={category}
            className="border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300"
            onChange={onCategorySelect}
          >
            <option value="">Select category</option>
            {categories?.length > 0 ? (
              categories.map((cat, index) => {
                return (
                  <option value={cat.id} key={index} index={index}>
                    {cat.name}
                  </option>
                );
              })
            ) 
             : (
              <option value="None">No category</option>
            )}
          </select>
        </div>
        <div className="block">
          <label className="text-md text-gray-800">Choose Image</label>
          <input
            type="file"
            name="image_name"
            onChange={onFileChange}
            required
            className={`${errors?.title &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.image_name && (
            <label className="text-sm italic text-red-600 py-1">
              {errors.image_name}
            </label>
          )}
        </div>
      </div>
      {success && (
        <div className="py-4 text-blue-800 text-md italic text-center">
          {success.message}
        </div>
      )}
      <div className="btn flex text-right">
        <button
          disabled={formloading}
          type="submit"
          className={`${formloading ?
            'bg-gray-300 cursor-not-allowed':'bg-purple-600'} mx-2 mb-8 py-1 mt-2 px-4 border-1 
           text-white font-semibold text-xl text-center outline-none capitalize`}
        >
          {update ? "Update" : "Save"}
        </button>
        {update && (
          <div
            onClick={() => newRecord()}
            className="cursor-pointer mb-8 py-1 mt-2 px-4 border-1 bg-pink-600
           text-white text-md text-center outline-none capitalize"
          >
            {update && "New"}
          </div>
        )}
      </div>
    </form>
  );
};

export default AddProduct;
