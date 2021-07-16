import Home from "./components/Home";
import Footer from "./components/inc/Footer";
import HelpLink from "./components/inc/HelpLink";
import ProductsState from "./components/context/products/ProductsState";
import CartState from "./components/context/cart/CartState";
import AuthState from "./components/context/auth/State";
import SettingsState from "./components/context/settings/SettingsState";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <AuthState>
            <ProductsState>
                <CartState>
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
                </CartState>
            </ProductsState>
        </AuthState>
    );
}

export default App;
