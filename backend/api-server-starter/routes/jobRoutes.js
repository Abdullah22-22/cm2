const express = require("express");
const { createJob, updateJob,getAllJobs,getJobById, deleteJob } = require("../controllers/jobController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, getAllJobs);
router.post("/", requireAuth, createJob);
router.delete("/:id", requireAuth, deleteJob);
router.get("/:id", getJobById);
router.put("/:id", requireAuth, updateJob);

module.exports = router;