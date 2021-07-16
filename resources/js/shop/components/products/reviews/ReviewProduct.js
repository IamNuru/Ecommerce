import React, { useContext, useState, useEffect } from "react";
import ProductsContext from "../../context/products/ProductsContext";
import AuthContext from "../../context/auth/Context";
import Star from "./Star";
import FormLoadingCover from "../../inc/FormLoadingCover";

const ReviewProduct = (props) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

    //destructure from auth state
    const {
        submitReview,
        updateReview,
        success,
        errors,
        formloading,
        setFormLoading,
        clearMessages,
        setProductToNull,
    } = useContext(ProductsContext);



    //initialise state variables
    const [data, setData] = useState({review: ""});
    const [rating, setRating] = useState("")
    const [isOn, setIsOn] = useState(0);
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(false);
    const [productId] = useState(props && props.match.params.id);
    const [reviewId, setReviewId] = useState("");
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);



    //destructure state variables
    const { review } = data;


    //when a radio input changes
    const onChange = e => {
        setRating(parseInt(e.target.value));
        setIsOn(parseInt(e.target.value));
    };
    //when text input changes
    const textInputChanges = e =>{
        setData({ ...data, [e.target.name]: e.target.value });
    }



    //search for the product passed in from the url
    useEffect(() => {
        const getProd = async () =>{
            await axios.get(`${process.env.MIX_APP_API_URL}/product/${productId}`)
            .then(async res =>{
                setProduct(res.data);
                setLoading(false);
                await axios.get(`${process.env.MIX_APP_API_URL}/user/reviewed/${productId}`, config)
                .then(res =>{
                    if (res.data && Object.keys(res.data).length === 0 && res.data.constructor === Object) {
                        setUpdate(false)
                        return false;
                    }else{
                    setUpdate(true)
                    setReviewId(res.data.id)
                    setRating(parseInt(res.data.rating))
                    setData({
                        review: res.data.review,
                    })
                    setIsOn(parseInt(res.data.rating))
                }
                }).catch(err =>{
                    setUpdate(false)
                    
                })
            }).catch(err =>{
                
            })
        } 

        getProd()
        
        // eslint-disable-next-line
    }, []);


    

    //submit the form 
    const onSubmit = e => {
        e.preventDefault();
        if (rating === "" || rating > 5 || rating < 1) {
            setError("Please select the rate");
            return false;
        } else if (review === "") {
            setError("Please Enter reason for such rate. e.g Nice Product");
            return false;
        } else {
            var formData = {
                rating: rating,
                review: review
            }
            if (update) {
                setFormLoading(true);
                updateReview(reviewId, formData);
            } else {
                setFormLoading(true);
                submitReview(productId, formData);
            }
        }
    };


    //clear messages on the form
    useEffect(() => {
        setTimeout(() => {
            clearMessages();
          }, 5000);
    }, [success])

    return (
        <>
            {!loading ? (
                product ? (
                        <div className="w-96 bg-white p-4 m-auto shadow-md">
                            {formloading && <FormLoadingCover />}
                            <div className="border-b font-semibold my-1 text-md text-center py-2">
                                Kindly Submit Your Review on the product below
                            </div>

                            <div className="border-b flex justify-center flex-wrap">
                            <img
                                src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
                                alt="thumbnail"
                                className="flex-shrink-0 w-24 h-24 mr-2"
                            />
                                <div className="text-monospace text-semibold capitalize mt-6">
                                    { product.title }
                                </div>
                            </div>

                            <form onSubmit={onSubmit} className="w-full">
                                <div className="block">
                                    <div className="text-left text-serif font-semibold text-ms">
                                        Rate
                                    </div>
                                    <div className="stars">
                                        <div className="flex flex-wrap">
                                            <label className="flex cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="5"
                                                    checked = {rating === 5}
                                                    onChange={onChange}
                                                    className="mt-1 border-1 outline-none"
                                                />
                                                <div
                                                    className={`${
                                                        isOn === 5
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <Star val={5} />
                                                </div>
                                                <span className="ml-1 text-xs">
                                                    5 stars
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label className="flex cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="4"
                                                    checked = {rating === 4}
                                                    onChange={onChange}
                                                    className="mt-1 border-1 outline-none"
                                                />
                                                <div
                                                    className={`${
                                                        isOn === 4
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <Star val={4} />
                                                </div>
                                                <span className="ml-1 text-xs">
                                                    4 stars
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label className="flex cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="3"
                                                    checked = {rating === 3}
                                                    onChange={onChange}
                                                    className="mt-1 border-1 outline-none"
                                                />
                                                <div
                                                    className={`${
                                                        isOn === 3
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <Star val={3} />
                                                </div>
                                                <span className="ml-1 text-xs">
                                                    3 stars
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label className="flex cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="2"
                                                    checked = {rating === 2}
                                                    onChange={onChange}
                                                    className="mt-1 border-1 outline-none"
                                                />
                                                <div
                                                    className={`${
                                                        isOn === 2
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <Star val={2} />
                                                </div>
                                                <span className="ml-1 text-xs">
                                                    2 stars
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label className="flex cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="1"
                                                    checked = {rating === 1}
                                                    onChange={onChange}
                                                    className="mt-1 border-1 outline-none"
                                                />
                                                <div
                                                    className={`${
                                                        isOn === 1
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <Star val={1} />
                                                </div>
                                                <span className="ml-1 text-xs">
                                                    1 star
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="block">
                                    <label className="text-gray-600 text-xs">
                                        Please give a reason for the rating
                                        above e.g Nice Product
                                    </label>
                                    <textarea
                                        name="review"
                                        onChange={textInputChanges}
                                        value={review}
                                        placeholder="Write a review about the product"
                                        className="w-full h-32 text-md p-2 text-monospace border border-gray-600 outline-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="text-xs p-2 text-red-600">
                                        {error}
                                    </div>
                                )}
                                {errors && (
                                    <div className="text-xs p-2 text-red-600">
                                        {errors}
                                    </div>
                                )}
                                {success && (
                                    <div className="text-md p-2 text-blue-600">
                                        {success}
                                    </div>
                                )}

                                <div className="flex w-full pr-4">
                                    <button
                                        type="submit"
                                        className="ml-auto bg-purple-600 text-white py-1 px-3 font-semibold"
                                    >
                                        {
                                            update ? "Update" : "Submit"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center">No product Found.</div>
            )) : (
                <div className="text-center">loading product...</div>
            )}
        </>
    );
};

export default ReviewProduct;
