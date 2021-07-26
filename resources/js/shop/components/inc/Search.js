import React, { useContext, useRef, useState, useEffect } from "react";
import { withRouter } from "react-router";
import ProductsContext from "../context/products/Context";
import CategoryContext from "../context/category/Context";

const Search = props => {
    const { products, searchProducts } = useContext(ProductsContext);
    const { catProducts } = useContext(CategoryContext)

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");

    const text = useRef("");
    const wrapper = useRef(null);

    // search for products that match the text ref
    const searchItem = e => {
        e.preventDefault();
        const txt = text.current.value;
        if (txt === "") {
            alert(" Please enter something");
            return false;
        }
        searchProducts(txt);
        props.history.push(`/search?text=${txt}`);
    };

    // set the input to whatever have been clicked
    const setSearchedInputItem = item =>{
      setSearch(item)
      setDisplay(false)
        searchProducts(item);
        props.history.push(`/search?text=${item}`);
    }

    //handle when click outside
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    //handle click outside function
    const handleClickOutside = event =>{
      const { current: wrap} = wrapper
      if(wrap && !wrap.contains(event.target)){
        setDisplay(false)
      }
    }

    //handle when inputs changes
    const onChange = e =>{
      setDisplay(true)
      setSearch(e.target.value)
    }

    return (
        <div ref={wrapper}>
            <form onSubmit={searchItem}>
                <input
                    required
                    ref={text}
                    value={search}
                    onClick={() => setDisplay(!display)}
                    onChange={onChange}
                    type="text"
                    placeholder="Search"
                    className="pl-2 py-1.5 md:mt-4 md:mb-1 w-full mr-2 rounded-full border border-gray-300 focus:border-purple-300 outline-none"
                />
            </form>
            {display && (
                <div className={`md:mb-8 cursor-pointer block text-left bg-gray-100 max-h-48 overflow-hidden`}>
                    {products !== null &&
                        products.filter(({title}) => title.indexOf(search.toLowerCase()) > -1).map((v, i) => {
                            return (
                                <div onClick={() => setSearchedInputItem(v.title)} 
                                className="px-1 hover:bg-gray-300 text-sm py-1" key={i}>
                                    {v.title}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default withRouter(Search);
