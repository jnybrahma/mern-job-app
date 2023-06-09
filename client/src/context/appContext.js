import React ,{ useContext, useReducer, useEffect} from "react";
import reducer from "./reducers";
import axios from 'axios'

import { DISPLAY_ALERT , 
        CLEAR_ALERT ,
        REGISTER_USER_BEGIN, 
        REGISTER_USER_SUCCESS,
        REGISTER_USER_ERROR,
        LOGIN_USER_BEGIN, 
        LOGIN_USER_SUCCESS,
        LOGIN_USER_ERROR,
        SETUP_USER_BEGIN, 
        SETUP_USER_SUCCESS,
        SETUP_USER_ERROR,
        TOGGLE_SIDEBAR,
        LOGOUT_USER,
        UPDATE_USER_BEGIN,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
        HANDLE_CHANGE,
        CLEAR_VALUES,
        CREATE_JOB_BEGIN,
        CREATE_JOB_SUCCESS,
        CREATE_JOB_ERROR,
        GET_JOBS_BEGIN,
        GET_JOBS_SUCCESS,
        SET_EDIT_JOB,
        DELETE_JOB_BEGIN,
        EDIT_JOB_BEGIN,
        EDIT_JOB_SUCCESS,
        EDIT_JOB_ERROR,
        SHOW_STATS_SUCCESS,
        SHOW_STATS_BEGIN,
        CLEAR_FILTERS,
        CHANGE_PAGE,
        GET_CURRENT_USER_BEGIN,
        GET_CURRENT_USER_SUCCESS

    } from "./actions";

//const token = localStorage.getItem('token');
//const user = localStorage.getItem('user');
//const userLocation = localStorage.getItem('location');

const initialState ={
    userLoading: true,
    jobs:[],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    showSidebar : false,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user:  null,
    userLocation:  '',
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation:  '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType:'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    stats : {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions:['latest', 'oldest','a-z','z-a'],

}

const AppContext = React.createContext()
const AppProvider = ({ children }) =>{
    const [state, dispatch]= useReducer(reducer ,initialState);

    // axios
    //axios.defaults.headers['Authorization'] = `Bearer ${state.token}`
    const authFetch = axios.create({
        baseURL: '/api/v1/',
       // headers:{
       //     Authorization: `Bearer ${state.token}`,
       // },
    })
// request

//authFetch.interceptors.request.use( 
//    (config) => {
//       config.headers['Authorization'] = `Bearer ${state.token}`;
//        return config

//    }, 
//        (error)=>{
//            return Promise.reject(error)    
//        }/
//)

authFetch.interceptors.response.use( 
    (response) => {
         return response

    }, 
        (error)=>{
            console.log(error.response)
            if(error.response.status === 401){
                //console.log('AUTH ERROR')
                logoutUser()
            }
            return Promise.reject(error)    
        }
)



    const displayAlert = () =>{
        dispatch({type:DISPLAY_ALERT})
    clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
                dispatch({
                    type: CLEAR_ALERT,
                })
        }, 3000)
    }

    //const addUserToLocalStorage =({user, token ,location }) =>{
    //    localStorage.setItem('user', JSON.stringify(user))
    //    localStorage.setItem('token', token)
    //    localStorage.setItem('location', location)
   // }

    //const removeUserFromLocalStorage =() =>{
    //    localStorage.removeItem('user')
    //    localStorage.removeItem('token')
    //    localStorage.removeItem('location')
   // }
const registerUser = async(currentUser) =>{
    dispatch({ type: REGISTER_USER_BEGIN})
    try{
        const response = await axios.post('/api/v1/auth/register', currentUser)
        //console.log(response);
        const {user,  location} = response.data
        dispatch({ 
            type: REGISTER_USER_SUCCESS,
            payload : { user,  location},
            })
         // local storage
        //    addUserToLocalStorage({user, token, location})
    } catch(error){
       // console.log(error.response)
        dispatch({ 
            type: REGISTER_USER_ERROR,
            payload: {msg: error.response.data.msg}
        })
    }
    clearAlert()
}

const loginUser = async(currentUser) =>{
    //console.log(currentUser)
     dispatch({ type: LOGIN_USER_BEGIN})
    try{
        const {data}= await axios.post('/api/v1/auth/login', currentUser)
        //console.log(response);
        const {user, location} = data
        dispatch({ 
            type: LOGIN_USER_SUCCESS,
            payload : { user,  location},
            })
         // local storage
          //  addUserToLocalStorage({user, token, location})
    } catch(error){
         dispatch({ 
            type: LOGIN_USER_ERROR,
            payload: {msg: error.response.data.msg}
        })
    }
    clearAlert()
}


const setupUser = async({currentUser, endPoint, alertText}) => {
    //console.log(currentUser)
     dispatch({ type: SETUP_USER_BEGIN})
    try {
        const {data}= await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
        //console.log(response);
        const {user, location} = data
        dispatch({ 
            type: SETUP_USER_SUCCESS,
            payload : { user, location, alertText},
            })
         // local storage
         //   addUserToLocalStorage({user, token, location})
    } catch(error){
         dispatch({ 
            type: SETUP_USER_ERROR,
            payload: {msg: error.response.data.msg}
        })
    }
    clearAlert()
}

const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
}

const logoutUser = async() => {
    await authFetch.get('/auth/logout');
    dispatch({type: LOGOUT_USER})
   // removeUserFromLocalStorage()
}

const updateUser = async (currentUser) =>{
   // console.log(currentUser)
   dispatch({type: UPDATE_USER_BEGIN})

    try{
        const { data } = await authFetch.patch('/auth/updateUser', currentUser )
        //,{
        //    headers:{
        //        Authorization: `Bearer ${state.token}`,
        //    },

       // }
       // 
       // console.log(data)
       const { user, location} = data

       dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user, location},
       })
     //  addUserToLocalStorage({ user, location, token })
    } catch(error){
        //console.log(error.response)
        if(error.response.status !== 401){ 
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {msg: error.response.data.msg},
            })
        }
    }
    clearAlert();
}

const handleChange = ({name, value}) =>{
    dispatch({
        type: HANDLE_CHANGE,
        payload: { name, value},
    })
}

const clearValues=() =>{
    dispatch({
        type: CLEAR_VALUES
    })
}
const createJob = async() =>{
    dispatch({
        type: CREATE_JOB_BEGIN
    })
    try{
        const { position, company, jobLocation, jobType, status} = state

        await authFetch.post('/jobs',{
            company,
            position,
            jobLocation,
            jobType,
            status,
        })
        dispatch({
            type: CREATE_JOB_SUCCESS,
        })
        dispatch({ type: CLEAR_VALUES})

    } catch(error){

        if(error.repsonse.status === 401) return
        dispatch({
            type: CREATE_JOB_ERROR,
            payload: { msg: error.response.data.msg},
        })

    }
    clearAlert();


}
const getCurrentUser = async () =>{
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try{
        const { data } = await authFetch('/auth/getCurrentUser');
        const { user , location } = data;
        dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            payload: { user, location },

        });
    } catch(error){
        if(error.response.status === 401 ) return
        logoutUser();
    }

}
useEffect(() =>{
    getCurrentUser();
    // eslint-disable-next-line
},[])

const getJobs = async () =>{
    const { page, search, searchStatus, searchType, sort } = state

    let url =`/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if(search){
        url = url + `&search=${search}`
    }

    dispatch({ type: GET_JOBS_BEGIN})
    try{
         const { data } = await authFetch(url)
         const { jobs, totalJobs, numOfPages } = data 
         dispatch({
            type: GET_JOBS_SUCCESS,
            payload:{
                jobs,
                totalJobs,
                numOfPages,
            },
         })
        }catch(error){
                //console.log(error.response)
                logoutUser()
        }
        clearAlert()
}

const setEditJob = (id) =>{
   // console.log(`set edit job: ${id}`)
   dispatch({ type: SET_EDIT_JOB, payload: { id }})
}
const editJob= async ()=>{
    dispatch({ type: EDIT_JOB_BEGIN})
    try{
        const { position, company, jobLocation, jobType, status } = state
        await authFetch.patch(`/jobs/${state.editJobId}`,{
            company,
            position,
            jobLocation,
            jobType,
            status,
        })
        dispatch({ type: EDIT_JOB_SUCCESS})
        dispatch({ type: CLEAR_VALUES})
    } catch(error){
        if(error.response.status === 401 ) return
        dispatch({
            type: EDIT_JOB_ERROR,
            payload: { msg: error.response.data.msg},
        })

    }
    clearAlert()
    //console.log('edit job')
}

const deleteJob = async (jobId) =>{
    dispatch({ type: DELETE_JOB_BEGIN})
   
    try{
        await authFetch.delete(`/jobs/${jobId}`)
        getJobs()
    } catch(error){
       // logoutUser()
       console.log(error.response)
    }
    
    
    //console.log(`delete: ${jobId}`)
}

const showStats = async () =>{
    dispatch({ type: SHOW_STATS_BEGIN });
    try{
        // GET route method is default for authFetch 
        const { data } = await authFetch('/jobs/stats');
        dispatch({
            type: SHOW_STATS_SUCCESS,
            payload:{
                stats:data.defaultStats,
                monthlyApplications: data.monthlyApplications,

            },
        });
    } catch(error){
        console.log(error.response)
        //logoutUser()
    }
    clearAlert()
}

const clearFilters = () =>{
     dispatch({type: CLEAR_FILTERS})
}
const changePage = (page) =>{
    dispatch({ 
        type: CHANGE_PAGE,
        payload: { page }
    })
}
    return(
        <AppContext.Provider value={
            {
            ...state, 
            displayAlert,
            registerUser,
            loginUser,
            setupUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            handleChange,
            clearValues,
            createJob, 
            getJobs,
            setEditJob,
            deleteJob,
            editJob,
            showStats,
            clearFilters,
            changePage,
            getCurrentUser
            }}>
            {children}
        </AppContext.Provider>
    )

}
// create custom hooks
const useAppContext = () =>{
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext}