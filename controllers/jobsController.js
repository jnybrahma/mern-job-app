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
    res.send('Get all Job')
}

const updateJob = async(req, res) => {
    res.send('Update Job')
}

const showStats = async(req, res) => {
    res.send('Show Job Status')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }