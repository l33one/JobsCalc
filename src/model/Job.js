const Database = require('../db/config')
/*
let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 1,
        createdAt: Date.now(),

    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        createdAt: Date.now(),


    }
];*/

module.exports = {
    async get() {
        const db = await Database()
        const jobs = await db.all(`SELECT * FROM jobs;`)
        db.close()
        return jobs.map(job => ({

            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at

        }))
    },
    async update(updatedJob, jobId) {
        //data = updatedJob
        const db = await Database()
        await db.run(`UPDATE jobs SET
        name = ${updatedJob.name},
        daily_hours=${updatedJob["daily-hours"]},
        total_hours=${updatedJob["total-hours"]},
        created_at = ${updatedJob.createdAt}
        WHERE id = ${updatedJob.id}
        `)
        await db.close()
    },
    async delete(id) {
        //data = data.filter(job => Number(job.id) !== Number(id))
        const db = await Database()
        db.run(`DELETE FROM jobs WHERE id = ${id}`)
    },
    async create(newJob) {
        // data.push(newJob)
        const db = await Database()
        await db.run(`INSERT INTO jobs (
            name,
            daily_hours, 
            total_hours, 
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
        )`)
        await db.close()
    }
}