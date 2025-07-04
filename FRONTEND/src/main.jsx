import ReactDOM from 'react-dom/client';
import './index.css'
import { createBrowserRouter,RouterProvider,Route, createRoutesFromElements } from'react-router-dom'
import Layout from './pages/Layout.jsx';
import {Stories,Event,
  Gallery,
  SignUp,
  Login,Home,
  Profile,
  Monuments,
  AddPost,
  ViewPage,
  EditProfile,SearchResults,Error404

} from "./pages/index.js"
  import { Provider } from 'react-redux'
  import globalStore,{persistor} from "./store/globalStore.js"
  import { PersistGate } from "redux-persist/integration/react";
 

  import AdminDashboard from "./adminPages/AdminDashboard.jsx"
  import AdminPostControl from './adminPages/AdminPostControl.jsx';
  import AdminEventsControl from './adminPages/AdminEventsControl.jsx';
  
const route= createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path="*" element={<Error404/>} />
        <Route path='' element={<Home/>} />
        <Route path='/stories' element={<Stories/>} />
        <Route path='/event' element={<Event/>} />
        <Route path='/gallery' element={<Gallery/> } />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/edit/" element={<EditProfile/>}/>

        {/* <Route path="/monuments" element={<Monuments/>}/> */}
        <Route path="/addPost" element={<AddPost/>}/>
        <Route path="/viewPage/:title" element={<ViewPage/>}/>
        <Route path="/searchResults/:title" element={<SearchResults/>}/>
        <Route path="/admin/dashboard/users" element={<AdminDashboard/>}/>
        <Route path="/admin/dashboard/posts" element={<AdminPostControl/>}/>
        <Route path="/admin/dashboard/events" element={<AdminEventsControl/>}/>
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