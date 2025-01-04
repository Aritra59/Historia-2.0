import ReactDOM from 'react-dom/client';
import './index.css'
import { createBrowserRouter,RouterProvider,Route, createRoutesFromElements } from'react-router-dom'
import Layout from './pages/Layout.jsx';
import {Stories,Event,
  Gallery,
  Places,
  SignUp,
  Login,Home,
  Profile} from "./pages/index.js"
  import { Provider } from 'react-redux'
  import globalStore,{persistor} from "./store/globalStore.js"
  import { PersistGate } from "redux-persist/integration/react";

  

const route= createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
        <Route path='/stories' element={<Stories/>} />
        <Route path='/event' element={<Event/>} />
        <Route path='/gallery' element={<Gallery/> } />
        <Route path='/places' element={<Places/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/test" element={<Test/>}/> */}
        </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={globalStore}>
        <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router = {route}/>
  </PersistGate>

  </Provider>
)