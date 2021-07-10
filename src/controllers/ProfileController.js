const Profile = require('../model/Profile')
module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },
    async update(req, res) {
        //req.bod para pegar os dados
        const data = req.body
        // definir quantas semanas de num ano
        const weeksPerYear = 52
        // remover as semanas de férias do ano
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
        // quantas horas por semana estou trabalhando
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']
        // total de horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //qual o valor da minha hora?
        const valueHour = data['value-hour'] = data['monthly-budget'] / monthlyTotalHours
        const profile = await Profile.get()
        Profile.update({
            ...profile,
            ...req.body,
            'value-hour': valueHour
        })
        return res.redirect('/profile')
    }
}