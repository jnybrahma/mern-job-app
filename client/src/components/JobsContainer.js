import { useEffect} from 'react'
import { useAppContext } from '../context/appContext'
//import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {

    const { getJobs, jobs, isLoading, page, totalJobs} = useAppContext()
    useEffect(()=>{
        getJobs()
    },[])

    if(isLoading){

    }
    if(jobs.length === 0){

    }

    return (
    <div>
      
    </div>
  )
}

export default JobsContainer
