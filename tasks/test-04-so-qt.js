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
            scene: ['html', 'test-04-so-qt/bouncing-ball.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 2
            text: '«Бесконечная» анимация: мячик, движущийся равномерно и прямолинейно до столкновения с краями экрана; при столкновении «отражается».',
            scene: ['html', 'test-04-so-qt/reflecting-ball.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 3
            text: '«Бесконечная» анимация: эллипс фиксированной формы и размеров вращается вокруг центра (полуоси должны быть разными!).',
            scene: ['html', 'test-04-so-qt/rotating-ellipse.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 4
            text: 'Анимация длительностью 1 секунда, начинающаяся при нажатии на кнопку (например, что-нибудь падает вниз).',
            scene: ['html', 'test-04-so-qt/falling-down-on-btnclick.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 5
            text: 'слева &mdash; поле ввода текста, справа &mdash; графическая сцена, элементы которой &mdash; строки этого текста; их можно перетаскивать. Сцена генерируется при нажатии кнопки.',
            scene: ['html', 'test-04-so-qt/drag-text.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 6
            text: 'Кнопка, при нажатии на которую показывается диалог выбора цвета. Выбранный цвет рисуется на кнопке.',
            scene: ['html', 'test-04-so-qt/color-picker.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 7
            text: 'Выпадающий список с тремя элементами: «круг», «квадрат», «треугольник». При выборе элемента из списка в расположенном ниже виде графической сцены изображается соответствующий элемент.',
            scene: ['html', 'test-04-so-qt/list-of-shapes.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 8
            text: 'Виджет, на котором изображена картинка из файла, а также круг, центр которого находится там же, где указатель мыши.',
            scene: ['html', 'test-04-so-qt/round-cursor-on-image.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 9
            text: 'Виджет, на котором изображена картинка из файла. Клик на виджете приводит к тому, что картинка плавно поворачивается на 90 градусов против часовой стрелки; её центр остаётся неподвижным и всегда находится в центре виджета.',
            scene: ['html', 'test-04-so-qt/image-rotating-on-click.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 10
            text: 'Конвертер температур из градусов по Цельсию в градусы по Фаренгейту и обратно. Указание: $t_C=\\frac59(t_F-32)$, где $t_C$ &mdash; температура в градусах по Цельсию, $t_F$ &mdash; по Фаренгейту.',
            scene: ['html', 'test-04-so-qt/celsius-fahrenheit.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 11
            text: 'Сияющее солнце (анимация).',
            scene: ['html', 'test-04-so-qt/shining-sun.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }, {    // 12
            text: 'Гиперпространственный переход (анимация).',
            scene: ['html', 'test-04-so-qt/hyperspace.html'],
            tags: ['complexity-3', 'qt', 'painting']
        }
]})
