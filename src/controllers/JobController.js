
const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
    create(req, res) {
        return res.render("job")
    },
    async save(req, res) {
        /*const jobs = await Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 1;*/
        await Job.create({
            //id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            createdAt: Date.now()
        })

        return res.redirect('/')
    },
    async show(req, res) {

        const jobId = req.params.id
        const jobs = await Job.get()
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!x')
        }
        const profile = await Profile.get()
        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])
        return res.render('job-edit', { job })
    },
    async update(req, res) {
        const jobId = req.params.id
        /*   const jobs = await Job.get()
           const job = jobs.find(job => Number(job.id) === Number(jobId))
   
           if (!job) {
               return res.send('Job not found!')
           }*/
        const updatedJob = {
            //   ...job,
            name: req.body.name,
            "total-hours": req.body['total-hours'],
            "daily-hours": req.body['daily-hours'],
        }

        /*  newJobs = jobs.map(job => {
              if (Number(job.id) === Number(jobId)) {
                  job = updatedJob
              }
              return job
          })*/
        //Job.update(newJobs)
        await Job.update(updatedJob, jobId)
        res.redirect('/job/' + jobId)

    },
    delete(req, res) {
        const jobId = req.params.id
        Job.delete(jobId)
        //Filter mantem os registros e remove os que derem match
        //Job.data = jobs.filter(job => Number(job.id) !== Number(jobId))


        return res.redirect('/')
    }

}