import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createJob = async(req, res) => {
    const { position, company } = req.body

    if (!position || !company) {
        throw new BadRequestError('Please Provide All values')
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })

    //res.send('Create Job')
}

const deleteJob = async(req, res) => {
    res.send('Delete Job')
}

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({jobs, totalJobs:jobs.length, numOfPages: 1})
    //res.send('Get all Job')
}

const updateJob = async(req, res) => {
    const { id: jobId } = req.params

    const { company, position } = req.body

    if(!company || !position){
        throw new BadRequestError('Please Provide All Values')
    }

    const job = await Job.findOne({_id: jobId})
    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`) 
    }

    // check permissions

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body,{
        new: true,
        runValidators: true,

    })
    //res.send('Update Job')
    res.status(StatusCodes.OK).json({updatedJob})
}

const showStats = async(req, res) => {
    res.send('Show Job Status')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }