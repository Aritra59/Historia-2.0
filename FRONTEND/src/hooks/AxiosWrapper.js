// ******************************************************FOR NEXT TIME*******************************************



// import axios from "axios"
// import { useState,useEffect } from "react"

//  function useApiWrapperForGet(url){
// const [data,setData] = useState({})
// const [loading,setLoading] = useState(false)
// const [error,setError] = useState(false)

// useEffect(()=>{
//     async()=>{
//         setLoading(true)
//         setError(false)

//         try {
//             const response = await axios.get(url)
//             if(response.status!==200){
//                 setError(true)
//             }
//             setData(response?.data)
//         } catch (error) {
//             console.error(error)
//         }

//     }
// },[url])

// return {data,loading,error}
// }


//  function useApiWrapperForPost(url,metadata){
// const [data,setData] = useState({})
// const [loading,setLoading] = useState(false)
// const [error,setError] = useState(false)

// useEffect(()=>{
//     async()=>{
//         setLoading(true)
//         setError(false)

//         try {
//             const response = await axios.post(url,metadata)
//             if(response.status!==200){
//                 setError(true)
//             }
//             setData(response?.data?.data)
//         } catch (error) {
//             console.error(error)
//         }

//     }
// },[url,metadata])

// return {data,loading,error}
// }

// export {
//     useApiWrapperForGet,
//     useApiWrapperForPost
// }