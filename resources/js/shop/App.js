import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Footer from "./components/inc/Footer";
import HelpLink from "./components/inc/HelpLink";
import ProductsState from "./components/context/products/State";
import CartState from "./components/context/cart/State";
import AuthState from "./components/context/auth/State";
import UserState from "./components/context/user/State";
import SettingsState from "./components/context/settings/State";
import CategoryState from "./components/context/category/State";
import BrandState from "./components/context/brand/State";
import OrderState from "./components/context/orders/State";
import DestinationState from "./components/context/destination/State";
import ReviewState from "./components/context/review/State";

function App() {
    return (
        <AuthState>
            <UserState>
                <ProductsState>
                    <CategoryState>
                        <BrandState>
                            <CartState>
                                <OrderState>
                                    <DestinationState>
                                        <ReviewState>
                                            <SettingsState>
                                                <div className="App block bg-white">
                                                    <Router>
                                                        <div className="block min-h-screen">
                                                            <Home />
                                                        </div>
                                                        <Footer />
                                                        <HelpLink />
                                                    </Router>
                                                </div>
                                            </SettingsState>
                                        </ReviewState>
                                    </DestinationState>
                                </OrderState>
                            </CartState>
                        </BrandState>
                    </CategoryState>
                </ProductsState>
            </UserState>
        </AuthState>
    );
}

export default App;
