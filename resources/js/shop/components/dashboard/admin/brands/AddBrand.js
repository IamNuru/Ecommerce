import React, { useContext, useState, useEffect } from "react";
import BrandContext from "../../../context/brand/Context";
import { Link } from "react-router-dom";


const AddBrand = () => {
  // destructure product context
  const {
    addBrand,
    errors,
    success,
    brand,
    updateBrand,
    clearMessages,
    formloading,
    setFormLoading,
    setBrandToNull
  } = useContext(BrandContext);

  // declare state"
  const [brandName, setBrandName] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    clearMessages();
    setFormLoading(false)
    if (brand) {
      setBrandName(brand.name);
      setUpdate(true);
    }


    return ()=>{
      setBrandToNull()
    }
    // eslint-disable-next-line
  }, [brand]);


  // on input changes
  const onChange = (e) => {
    setBrandName( e.target.value );
  };

  //clear form on success
  if(success){
    setTimeout(() => {
      setBrandName("");
    }, 500);
  }
  //clear inputs when you get success message
  useEffect(() => {
    setTimeout(() => {
      clearMessages();
      setUpdate(false)
    }, 5000);

    // eslint-disable-next-line
  }, [success]);

  //clear form for new inputs
  const clearForm = () =>{
    clearMessages()
    setBrandName("");
    setUpdate(false)
}

  //on submit of form
  const onSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true)
    clearMessages();
    const data = { brandName : brandName }
    if (update) {
      updateBrand(brand.id, data);
    } else {
      addBrand(data);
    }
  };
  return (
    <div>
      <div className="w-screen flex px-2 bg-white py-2 -ml-4 pl-2 -mt-1">
        <li className="list-none">
          <Link to="/admin/area/brands" className="text-purple-600 px-2 py-1">brands</Link>
        </li>
      </div>
    <form onSubmit={onSubmit} className="px-4" title={`${formloading && 'processing'}`}>
      <div className="w-full block grid grid-col-1 md:grid-cols-2 gap-4">
        <div className="w-full block">
          <label className="py-1 text-md text-gray-800">Name</label>
          <input
            type="text"
            name="brandName"
            onChange={onChange}
            value={brandName}
            required
            className={`border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300`}
          />
          {errors?.brandName && (
            <label className="py-1 text-sm italic text-red-600">
              {errors.brandName}
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
          type="button"
          onClick={clearForm}
          className={`${!update &&
            "hidden"} mb-8 py-1 mt-2 px-4 border-1 bg-pink-600
           text-white text-md text-center outline-none capitalize`}
        >
          New
        </button>
      </div>
    </form>
    </div>
  );
};

export default AddBrand;
