import React, { useContext, useState, useEffect } from "react";
import ProductsContext from "../../context/products/ProductsContext";

const AddCategory = () => {
  // destructure product context
  const {
    addCategory,
    errors,
    success,
    category,
    updateCategory,
    clearMessages,
    formloading,
    setFormLoading
  } = useContext(ProductsContext);

  // declare state
  const [data, setData] = useState({
    categoryName: "",
    description: "",
  });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    clearMessages();
    setFormLoading(false)
    if (category) {
      setData({
        categoryName: category.name,
        description: category.description,
      });
      setUpdate(true);
    }

    // eslint-disable-next-line
  }, [category]);

  // destructure data state
  const { categoryName, description } = data;

  // on input changes
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //clear form on success
  if(success){
    setTimeout(() => {
      setData({
        categoryName: "",
        description: "",
      });
    }, 500);
  }
  //clear inputs when you get success message
  useEffect(() => {
    setTimeout(() => {
      clearMessages();
    }, 2000);

    // eslint-disable-next-line
  }, [success]);

  //on submit of form
  const onSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true)
    clearMessages();
    if (update) {
      updateCategory(category.id, data);
    } else {
      addCategory(data);
    }
  };
  return (
    <form onSubmit={onSubmit} className="px-4" title={`${formloading && 'processing'}`}>
      <div className="w-full block grid grid-col-1 md:grid-cols-2 gap-4">
        <div className="w-full block">
          <label className="py-1 text-md text-gray-800">Name</label>
          <input
            type="text"
            name="categoryName"
            onChange={onChange}
            value={categoryName}
            required
            className={`${errors?.categoryName &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.categoryName && (
            <label className="py-1 text-sm italic text-red-600">
              {errors.categoryName}
            </label>
          )}
        </div>
        <div className="w-full block">
          <label className="py-1 text-md text-gray-800">Description</label>
          <textarea
            name="description"
            onChange={onChange}
            value={description}
            required
            className={`${errors?.description &&
              "border-red-600 "} border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          ></textarea>
          {errors?.description && (
            <label className="py-1 text-sm italic text-red-600">
              {errors.description}
            </label>
          )}
        </div>
      </div>
      {success && (
        <div className="py-4 text-blue-800 text-md italic text-center">
          {success.message}
        </div>
      )}
      <div className="btn flex float-right">
        <button
        disabled={formloading}
          type="submit"
          className={`${formloading ? 'bg-gray-300':'bg-purple-600'} mb-8 mx-2 py-1 mt-2 px-4 border-1
           text-white font-semibold text-md text-center outline-none capitalize`}
        >
          {update ? "Update" : "Save"}
        </button>
        <button
          type="submit"
          className={`${!update &&
            "hidden"} mb-8 py-1 mt-2 px-4 border-1 bg-pink-600
           text-white text-md text-center outline-none capitalize`}
        >
          New
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
