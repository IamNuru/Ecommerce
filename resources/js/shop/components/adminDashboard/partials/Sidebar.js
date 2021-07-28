import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  //set chat state
  const [countChatList, setCountChatList] = useState(0)

  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split('/').pop();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  //fetch count of requested chats
  //fetch requested chats
  useEffect(() => {
    //set configuration for making request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
    axios.get(`${process.env.MIX_APP_API_URL}/fetch/all/requestedchats`,config
        )
        .then(res => {
            setCountChatList(res.data.length);
        })
        .catch(err => {
          setCountChatList(0);
          
        });
}, []);



  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
              <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">Pages</h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'area' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'area' && 'text-indigo-500'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                    <path className={`fill-current text-gray-600 ${page === 'area' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                    <path className={`fill-current text-gray-400 ${page === 'area' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                  </svg>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
              </NavLink>
            </li>
            {/* sales */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'sales' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/sales" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'sales' && 'text-indigo-300'}`} d="M22.587 14.624l-9.584-9.624h-4.928c.106.357.167.701.173 1.025.985.123 1.752.956 1.752 1.975 0 1.104-.896 2-2 2s-2-.896-2-2c0-.843.524-1.561 1.262-1.855.01-.337-.067-.731-.227-1.145h-2.035v8.005l9.623 9.582 7.964-7.963zm-14.489-7.604c-.088.215-.207.408-.362.568-.231.239-.472.394-.719.495.045.511.461.917.983.917.552 0 1-.448 1-1 0-.517-.399-.929-.902-.98zm15.902 7.605l-9.375 9.375-10.625-10.579v-5.914c-1.123-.512-2.394-1.091-4-1.091v-1c1.611 0 2.92.511 4 .994v-2.41h2.492c-1.054-1.53-3.181-3-6.492-3v-1c4.093 0 6.603 2.055 7.661 4h5.757l10.582 10.625zm-6.997 1.731l.521.521-.698.697-.54-.538c-.525.396-1.068.597-1.612.597-.652 0-1.272-.295-1.734-.753l.738-.739c.303.27.631.462 1.049.462.443 0 .896-.228 1.347-.679.361-.359.569-.736.621-1.122.102-.76-.489-1.258-1.078-1.258-.392 0-.875.184-1.475.563-1.225.773-2.402 1.243-3.413.232-.918-.917-.645-2.112-.076-2.938l-.653-.652.698-.699.626.627c.538-.45 1.097-.677 1.663-.677.665 0 1.286.316 1.761.792l-.744.744c-.731-.742-1.624-.545-2.276.106-.322.323-.52.675-.572 1.02-.122.81.6 1.218.961 1.218.338 0 .774-.174 1.456-.584.944-.563 1.593-.804 2.171-.804.513 0 .963.202 1.378.617 1.038 1.038.624 2.351-.119 3.247z" />
                   </svg>
                  <span className="text-sm font-medium">Sales</span>
                </div>
              </NavLink>
            </li>
            {/* products */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'products' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/products" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'products' && 'text-indigo-500'}`} d="M2.978 8.358l-2.978-2.618 8.707-4.74 3.341 2.345 3.21-2.345 8.742 4.639-3.014 2.68.014.008 3 4.115-3 1.634v4.122l-9 4.802-9-4.802v-4.115l1 .544v2.971l7.501 4.002v-7.889l-2.501 3.634-9-4.893 2.978-4.094zm9.523 5.366v7.875l7.499-4.001v-2.977l-5 2.724-2.499-3.621zm-11.022-1.606l7.208 3.918 1.847-2.684-7.231-3.742-1.824 2.508zm11.989 1.247l1.844 2.671 7.208-3.927-1.822-2.498-7.23 3.754zm-9.477-4.525l8.01-4.43 7.999 4.437-7.971 4.153-8.038-4.16zm-2.256-2.906l2.106 1.851 7.16-3.953-2.361-1.657-6.905 3.759zm11.273-2.052l7.076 3.901 2.176-1.935-6.918-3.671-2.334 1.705z" />
                    {/* <path className={`fill-current text-gray-600 ${page === 'products' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                    <path className={`fill-current text-gray-400 ${page === 'products' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" /> */}
                  </svg>
                  <span className="text-sm font-medium">Products</span>
                </div>
              </NavLink>
            </li>
            {/* Categories */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'categories' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/categories" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'categories' && 'text-indigo-500'}`} d="M22 18v-7h-9v-5h3v-6h-8v6h3v5h-9v7h-2v6h6v-6h-2v-5h7v5h-2v6h6v-6h-2v-5h7v5h-2v6h6v-6z" />
                    </svg>
                  <span className="text-sm font-medium">Categories</span>
                </div>
              </NavLink>
            </li>
            {/* brands */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'brands' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/brands" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'brands' && 'text-indigo-500'}`} d="M11.499 12.03v11.971l-10.5-5.603v-11.835l10.5 5.467zm11.501 6.368l-10.501 5.602v-11.968l10.501-5.404v11.77zm-16.889-15.186l10.609 5.524-4.719 2.428-10.473-5.453 4.583-2.499zm16.362 2.563l-4.664 2.4-10.641-5.54 4.831-2.635 10.474 5.775z" />
                    </svg>
                  <span className="text-sm font-medium">Brands</span>
                </div>
              </NavLink>
            </li>
            {/* customers */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'customers' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/customers" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'customers' && 'text-indigo-500'}`} d="M20.332 23h-6.999l-2.226-6.543c-.136-.279-.42-.457-.732-.457h-.375v-1h3.729l2.056-3.738c.106-.171.285-.262.467-.262.426 0 .691.469.467.834l-1.741 3.166h4.044l-1.741-3.166c-.224-.365.041-.834.467-.834.182 0 .361.091.467.262l2.056 3.738h3.729v1h-.374c-.312 0-.597.178-.733.459l-2.561 6.541zm-8.396-1h-11.936c0-.277-.002-2.552-.004-2.803-.008-2.111.083-3.319 2.514-3.88 2.663-.614 5.801-1.165 4.537-3.495-3.744-6.906-1.067-10.822 2.954-10.822 3.942 0 6.686 3.771 2.952 10.822l-1.091 2.178h-1.862c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h.236l1.7 5zm3.546-4.426c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3zm2-.074c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3zm2.036 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3z" />
                  </svg>
                  <span className="text-sm font-medium">Customers</span>
                </div>
              </NavLink>
            </li>
            
            {/* destinations */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'destinations' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/destinations" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'destinations' && 'text-indigo-500'}`} d="M12 9.185l7 6.514v6.301h-14v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h18v-9.172l-9-8.375zm2 14.547h-4v-6h4v6zm10-8.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z" />
                    </svg>
                  <span className="text-sm font-medium">Destinations</span>
                </div>
              </NavLink>
            </li>
            {/* users */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'users' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/users" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'users' && 'text-indigo-500'}`} d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
                  </svg>
                  <span className="text-sm font-medium">Users</span>
                </div>
              </NavLink>
            </li>
            {/* track an order */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'trackorder' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/trackorder" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'trackorder' && 'text-indigo-500'}`} d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                    
                  </svg>
                  <span className="text-sm font-medium">Track Order</span>
                </div>
              </NavLink>
            </li>
            {/* transactions */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'transactions' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/transactions" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'transactions' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-400 ${page === 'transactions' && 'text-indigo-300'}`} d="M7 0l6 7H8v10H6V7H1z" />
                    <path className={`fill-current text-gray-600 ${page === 'transactions' && 'text-indigo-500'}`} d="M18 7v10h5l-6 7-6-7h5V7z" />
                  </svg>
                  <span className="text-sm font-medium">Transactions</span>
                </div>
              </NavLink>
            </li>
            {/* Orders */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'chatlist' && 'bg-gray-900'}`}>
              <NavLink exact to="/admin/area/chatlist" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'orders' && 'hover:text-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <path className={`fill-current text-gray-400 ${page === 'chatlist' && 'text-indigo-300'}`} d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z" />
                      
                    </svg>
                    <span className="text-sm font-medium">Chat List</span>
                  </div>
                  {/* Badge */}
                  <div className="flex flex-shrink-0 ml-2">
                    <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded-sm">{countChatList}</span>
                  </div>
                </div>
              </NavLink>
            </li>
            {/* Team */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page.startsWith('team-') && 'bg-gray-900'}`}>
              <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page.startsWith('team-') && 'hover:text-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <path className={`fill-current text-gray-600 ${page.startsWith('team-') && 'text-indigo-500'}`} d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                      <path className={`fill-current text-gray-400 ${page.startsWith('team-') && 'text-indigo-300'}`} d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                    </svg>
                    <span className="text-sm font-medium">Team</span>
                  </div>
                  {/* Icon */}
                  <div className="flex flex-shrink-0 ml-2">
                    <svg className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400 ${page.startsWith('team-') && 'transform rotate-180'}`} viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </NavLink>
              <ul className={`pl-9 mt-1 ${!page.startsWith('team-') && 'hidden'}`}>
                <li className="mb-1 last:mb-0">
                  <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'team-tabs' && 'text-indigo-400 hover:text-indigo-400'}`}>
                    <span className="text-sm font-medium">Team - Tabs</span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150" ${page === 'team-tiles' && 'text-indigo-400 hover:text-indigo-400'}`}>
                    <span className="text-sm font-medium">Team - Tiles</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Messages */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'messages' && 'bg-gray-900'}`}>
              <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'messages' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-600 ${page === 'messages' && 'text-indigo-500'}`} d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                    <path className={`fill-current text-gray-400 ${page === 'messages' && 'text-indigo-300'}`} d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                  </svg>
                  <span className="text-sm font-medium">Messages</span>
                </div>
              </NavLink>
            </li>
            {/* Tasks */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'tasks' && 'bg-gray-900'}`}>
              <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'tasks' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-600 ${page === 'tasks' && 'text-indigo-500'}`} d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
                    <path className={`fill-current text-gray-600 ${page === 'tasks' && 'text-indigo-500'}`} d="M1 1h22v23H1z" />
                    <path className={`fill-current text-gray-400 ${page === 'tasks' && 'text-indigo-300'}`} d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />
                  </svg>
                  <span className="text-sm font-medium">Tasks</span>
                </div>
              </NavLink>
            </li>
            {/* Settings */}
            <li className={`hidden px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === 'settings' && 'bg-gray-900'}`}>
              <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'settings' && 'hover:text-gray-200'}`}>
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path className={`fill-current text-gray-600 ${page === 'settings' && 'text-indigo-500'}`} d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                    <path className={`fill-current text-gray-400 ${page === 'settings' && 'text-indigo-300'}`} d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                    <path className={`fill-current text-gray-600 ${page === 'settings' && 'text-indigo-500'}`} d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                    <path className={`fill-current text-gray-400 ${page === 'settings' && 'text-indigo-300'}`} d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
                  </svg>
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;