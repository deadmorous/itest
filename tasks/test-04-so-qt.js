var tasks = require('../routes/tasks.js')

module.exports = tasks.Tasks.fromObject({
    description: 'Экзамен по современным технологиям прогаммирования, СО 2018 осень',
    options: {
        noscreensize: true
    },
    tags: ['so-tests'],
    items: [
        {       // 1
            text: '«Бесконечная» анимация: мячик, прыгающий вверх и вниз.',
            scene: ['html', 'bounding-ball.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }
]})

