import React, { useState, useContext, useEffect, useRef } from "react";
import ProductsContext from "../../context/products/Context";
import "../../../styles/homepage.css";

const SortProducts = () => {
    const {
        products,
        filterProductsBy,
        sortProductsBy,
        getBrands,
        allproducts,
        getAllProducts
    } = useContext(ProductsContext);

    const [toggleFilter, setToggleFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState([]);
    const [brands, setBrands] = useState([]);

    const text = useRef("");

    useEffect(() => {
        getBrands();

        const t =
            allproducts &&
            allproducts.filter(
                (v, i, a) => i === a.findIndex(p => p.brand === v.brand)
            );

        allproducts &&
            t.map(e => {
                if (!brands.find(i => i.id === e.id)) {
                    brands.push({ name: e.brand, id: e.id });
                }
            });
    }, [allproducts]);

    const toggle = () => {
        setToggleFilter(!toggleFilter);
    };

    const onChange = e => {
        setSearch(e.target.value);
    };

    const searchItem = e => {
        e.preventDefault();
    };

    const handleSelectedBrands = async e => {
        let newArray = [...brand, e.target.id];

        if (brand.includes(e.target.id)) {
            newArray = newArray.filter(b => b !== e.target.id);
        }
        await setBrand(newArray);
        filterProductsBy("brands", newArray);
    };

    //sort and filter functions
    const priceSort = e => {
        sortProductsBy(e.target.name, e.target.value);
    };

    const handleSearchInputChanges = e => {
        if (text.current.value !== "") {
            filterProductsBy("search_input", e.target.value);
        } else {
            getAllProducts();
        }
    };

    const filterBy = filter => {
        filterProductsBy(filter);
    };
    return (
        <div className="w-full mt-1 bg-white mb-2 border border-gray-100 ">
            <div className="w-full py-1">
                <div className="flex justify-between mr-4 mb-1">
                    <div className="flex-grow px-4">
                        <form
                            onSubmit={handleSearchInputChanges}
                            className="flex"
                        >
                            <input
                                required
                                ref={text}
                                onChange={handleSearchInputChanges}
                                type="text"
                                placeholder="Search"
                                className="pl-2 py-1.5 w-full mr-2 border border-gray-300 focus:border-purple-300 outline-none"
                            />
                            <button
                                type="submit"
                                className="outline-none bg-blue-600 py-1 text-white px-4 text-times font-semibold"
                            >
                                search
                            </button>
                        </form>
                    </div>
                    <i
                        onClick={toggle}
                        className="fa fa-filter text-2xl cursor-pointer text-green-600"
                        title="Filter"
                    >
                    </i>
                </div>
            </div>

            <div
                className={`close-box ${toggleFilter &&
                    "open-box"} overflow-auto w-full bg-white mb-1 px-4`}
            >
                <div className="">
                    <h2 className="font-semibold text-gray-600">Sort By:</h2>
                    <h2 className="">Price</h2>
                    <div className="flex flex-wrap">
                        <label className="mx-1 px-2 cursor-pointer flex">
                            <input
                                type="radio"
                                name="price"
                                value="des"
                                onChange={priceSort}
                                className="cursor-pointer mt-1 border-1 outline-none"
                            />
                            <span className="px-1 text-gray-600 capitalize">
                                Highest
                            </span>
                        </label>
                        <label className="mx-1 px-2 cursor-pointer flex">
                            <input
                                type="radio"
                                name="price"
                                value="asc"
                                onChange={priceSort}
                                className="cursor-pointer px-1 mt-1 border-1 outline-none"
                            />
                            <span className="px-1 text-gray-600 capitalize">
                                Lowest
                            </span>
                        </label>
                    </div>
                </div>
                {brands && (
                    <div className="mt-2">
                        <h2 className="font-semibold text-gray-600">Filter By:</h2>
                        <h2 className="">Brands</h2>
                        <div className="flex flex-wrap">
                            {brands?.length > 0
                                ? brands.map((b, index) => {
                                      return (
                                          <label
                                              className="mx-1 px-2 cursor-pointer flex"
                                              key={index}
                                          >
                                              <input
                                                  type="checkbox"
                                                  name=""
                                                  id={b.name}
                                                  value={b.name}
                                                  onChange={
                                                      handleSelectedBrands
                                                  }
                                                  className="cursor-pointer px-1 mt-1 border-1 outline-none"
                                              />
                                              <span className="px-1 text-gray-600 capitalize">
                                                  {b.name}
                                              </span>
                                          </label>
                                      );
                                  })
                                : "No brands yet"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortProducts;
