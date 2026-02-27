const Job = require("../models/jobModel.js")
const mongoose = require("mongoose");
const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        return res.status(201).json(job);

    } catch (err) {
        return res.status(400).json({
            message: "Failed to create job",
            error: err.message,
        })
    }
}
const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found"
            })
        }
        return res.status(200).json(updatedJob)
    } catch (err) {
        return res.status(400).json({
            message: "Failed to update job",
            error: err.message,
        })
    }
}

const getAllJobs = async (req, res) => {

    const limit = Number(req.query._limit);
    const is_valid_limit = Number.isInteger(limit) && limit > 0;
    if (!is_valid_limit) {

        console.warn("Warning: pagination limit is not an integer or <= 0");
    }

    try {
        const jobs = limit
            ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
            : await Job.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "All jobs fetched",
            jobs,
        });
    } catch (e) {
        console.error("Error in getAllJobs():", e);
        return res.status(500).json({
            message: "Error in getAllJobs()",
            error: e.message,
        })
    }
}


const getJobById = async (req, res) => {
    const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job id" });
  }
    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json(job);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid job id",
            error: err.message,
        });
    }

}

const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        return res.status(200).json({
            message: "Job deleted successfully",
            job: deletedJob,
        });
    } catch (e) {
        console.error("Error in deleteJob():", e);
        return res.status(500).json({
            message: "Error in deleteJob()",
            error: e.message,
        })
    }
}

module.exports = {
    createJob,
    getAllJobs,
    deleteJob,
    updateJob,
    getJobById
};
