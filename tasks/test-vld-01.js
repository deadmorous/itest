var tasks = require('../routes/tasks.js')
var ppi = require('../routes/parse-program-input.js')
var lp = require('../routes/line-printer.js')

//right
function vecp3(a,b)
{
    return [ a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]  ]
}

function scalp3(a,b)
{
    var s=0
    for(var i=0;i<3;++i) 
        s+=a[i]*b[i]
    return s
}

function mod3(a)
{
    return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])
}

function print_arr(a, p)
{
    a.forEach(function(val){
        p.print(val)
    })
    p.println()
}

module.exports = tasks.Tasks.fromObject({
    description: 'Tasks from Alexey',
    items: [{
        text: [
            'Дан упорядоченный массив целых чисел. Напечатать все различные элементы с указанием числа вхождений каждого элемента в массив. Например, для массива [1,2,2,2,5,6,6] должно быть напечатано<br>',
            '1  1<br>',
            '2  3<br>',
            '5  1<br>',
            '6  2<br>',].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            var m = new Map 
            args.a.forEach(function(val){
                if (m.has(val))
                    m.set(val,m.get(val)+1)
                else
                    m.set(val,1)
            })           
            
            m.forEach(function(val,key,map){
                printer.println(key,'   ',val)  //TODO: tabulation
            })
            return printer.finish()
        }],
        stdin: '7   1 2 2 2 5 6 6',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел и целое число $n$. Напечатать количество вхождений числа $n$ в массив.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, whole size, int a[size]')
            if (args.n > 100)
                throw new Error('Слишком большое size')
            var count=0
            args.a.forEach(function(val){if(val===args.n) ++count})
            return lp().println(count).finish()
        }],
        stdin: '5  10  3 7 4 5 5 3 9 5 7 9 ',
        stdinHint: 'Введите $n, s, a_1, \\ldots, a_s$'
    },
    {
        text: [
            'Вычислить $e^x$, используя разложение в ряд Тейлора. Вычисление прекращать, когда член ряда станет меньше $\\varepsilon=10^{-8}$.',
            'На всякий случай, $e^x=\\sum\\limits_{n=0}^\\infty \\frac{x^n}{n!}$.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'real x')
            if (args.x>50)
                throw new Error('Слишком большое x')
            
            if (args.x<-15)
                throw new Error('Слишком малое x')
            var s=1
            var p=1
            var n=1
            for( ;n<200;++n)
            {
                p*=args.x/n
                s+=p
                if (Math.abs(p)<1e-8) break
            } 
            return lp().println(s).finish()
        }],
        stdin: '1',
        stdinHint: 'Введите $x$'
    },
    {
        text: [
            'Дан массив из шести вещественных чисел $x_1$, $y_1$, $z_1$, $x_2$, $y_2$, $z_2$. Это декартовы координаты двух векторов.',
            'Определить, параллельны векторы или нет (напечатать результат проверки). Указание. Векторы $\\bf a$ и $\\bf b$ параллельны, если их векторное',
            'произведение ${\\bf a}\\times{\\bf b}$ равно нулю; считать, что векторы параллельны при $|{\\bf a}\\times{\\bf b}|\\le\\varepsilon|{\\bf a}||{\\bf b}|$, $\\varepsilon=10^{-8}$.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'real a[3], real b[3]')
            var str
            if(mod3(vecp3(args.a,args.b))<=mod3(args.a)*mod3(args.b)*1e-8)
                str='Векторы параллельны'
            else 
                str='Векторы не параллельны'
            return lp().println(str).finish()
        }],
        stdin: '1 2 3 2 4 6.1',
        stdinHint: 'Введите $a_0, \\ldots, a_5$'
    },
    {
        text: [
            'Дан массив из девяти вещественных чисел $x_1$, $y_1$, $z_1$, $x_2$, $y_2$, $z_2$, $x_3$, $y_3$, $z_3$. Это декартовы координаты трех векторов.',
            'Определить, компланарны векторы или нет (напечатать результат проверки). Указание. Векторы $\\bf a$, $\\bf b$ и $\\bf c$ компланарны, если их смешанное ',
            'произведение $({\\bf a}\\times{\\bf b})\\cdot {\\bf c}$ равно нулю; считать, что векторы компланарны при $|({\\bf a}\\times{\\bf b})\\cdot {\\bf c}|\\le\\varepsilon|{\\bf a}||{\\bf b}||{\\bf c}|$, $\\varepsilon=10^{-8}$.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'real x[3], real y[3], real z[3]')
            var printer=lp()
            if (Math.abs(scalp3(vecp3(args.x,args.y),args.z))<=mod3(args.x)*mod3(args.y)*mod3(args.z)*1e-8)
                printer.println('Векторы компланарны.')
            else
                printer.println('Векторы не компланарны.')
            return printer.finish()
        }],
        stdin: '-0.24951 0.74612 0.61729 0.5621 0.55952 1.17089 0.81161 -0.1866 0.5536 ',
        stdinHint: 'Введите $a_0, \\ldots, a_8$'
    },
    {
        text: [
            'Дан упорядоченный массив целых чисел. Напечатать элемент, повторяющийся в массиве чаще всего, а также количество повторений. Если есть несколько элементов, ',
            'повторяющихся одинаковое число раз, выбрать любой из них.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            
            var m = new Map 
            args.a.forEach(function(val){
                if (m.has(val))
                    m.set(val,m.get(val)+1)
                else
                    m.set(val,1)
            })           
            
            var max_count=0
            var max_key
            m.forEach(function(val,key,map){
                if (val>max_count)
                {
                    max_count=val
                    max_key=key
                }
            })
            return lp().println(max_key,m.get(max_key)).finish()
        }],
        stdin: '15  1 3 5 5 5 5 6 6 7 7 7 8 9 9 9',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Расставить его элементы в обратном порядке. Напечатать оба массива.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            var b = new Array
            args.a.forEach(function(val){b.unshift(val);printer.print(val)})
            printer.println()
            print_arr(b,printer)
            return printer.finish()
        }],
        stdin: '10    2 4 3 5 4 6 5 7 6 8',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Найти (и напечатать) количество участков нестрогой монотонности в нём. Например, в массиве [1,2,2,3] один такой участок, в массиве [1,2,3,2] --- два, а в массиве [1,2,1,2] их три.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            var m_c=0
            var m_t=-2
            
            for(var i=1;i<args.n;++i)
            {
                var s=Math.sign(args.a[i-1]-args.a[i])
                switch(m_t)
                {
                case -1:
                    if (s>0)
                    {
                        m_t=1
                        m_c++
                    }
                    break
                case 1:
                    if (s<0)
                    {
                        m_t=-1
                        m_c++
                    }
                    break
                default:
                    if(s!=0)
                    {
                        m_t=s
                        m_c++
                    }
                }

            }
            return printer.println(m_c).finish()
        }],
        stdin: '20    2 4 3 5 5 5 5 4 3 2 2 2 3 4 5 6 7 7 6 5',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Найти самый длинный участок строгого возрастания, напечатать индексы элементов в начале и в конце этого участка. Если имеется несколько участков строгого возрастания одной длины, можно выбрать любой из них.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()

            var acc=false
            var acc_s=-1,acc_e=-1
            var acc_s_max=-1,acc_e_max=-1
            
            function finish_acc(end_idx)
            {
                if (!acc) throw new Error('ERROR!!!111')
                acc=false
                acc_e=end_idx
                if (acc_e-acc_s>acc_e_max-acc_s_max)
                {
                    acc_e_max=acc_e
                    acc_s_max=acc_s
                }
            }
            for(var i=1;i<args.n;++i)
            {
                var t=args.a[i]>args.a[i-1]
                if ((!acc) && t)
                {
                    acc=true
                    acc_s=i-1
                }
                if(acc && (!t))
                    finish_acc(i-1)
                if(t && (i==args.n-1))
                    finish_acc(i)
            }
            return printer.print(acc_s_max,acc_e_max).finish()
        }],
        stdin: '20    2 4 3 5  5 5 5 4 3 2 2   2 3 4 5 6 7   7 6 5',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Циклически сдвинуть его элементы на одну позицию влево, например, [1,5,3,7] $\\rightarrow$ [5,3,7,1]. Напечатать оба массива.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            
            print_arr(args.a,printer)
            args.a.push(args.a.shift())
            print_arr(args.a,printer)
            return printer.finish()
        }],
        stdin: '4   1 5 3 7',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дана последовательность $x_{n+1}=x_n^2 + c$, $x$ и $c$ --- комплексные числа, $n=0,1,2,\\ldots$ Определить, ограниченна ли эта последовательность при заданных $x_0$ и $c$, напечатать результат. Указание. Последовательность неограниченна, если для некоторого $n$ имеет место неравенство $|x_n|>2\\max\\{1,|c|\\}$.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'real Re_c, real Im_c, real Re_x0, real Im_x0')
            
            function mod2(r,i)
            {
                return r*r+i*i
            }

            var mod2_c=mod2(args.Re_c,args.Im_c)
            var escape=mod2_c>1?4*mod2_c:4

            var Re_x,Im_x
            var i=0
            var max_iter=1000
            for(;i<max_iter;++i)
            {
                Re_x=args.Re_x0*args.Re_x0-args.Im_x0*args.Im_x0+args.Re_c
                Im_x=2*args.Re_x0*args.Im_x0+args.Im_c
                if(mod2(Re_x,Im_x)>escape) break
                args.Re_x0=Re_x
                args.Im_x0=Im_x
            }
            var printer=lp()
            printer.println('Последовательность '+(i==max_iter?'ограничена':'неограничена'))
            return printer.finish()
        }],
        stdin: '-0.99823459867075659  0.28726115158486704 0 0',
        stdinHint: 'Введите $c$, $x_0$'//TODO:latex Real Im ?
    },
    {
        text: [
            'Дан упорядоченный массив целых чисел. Он описывает лестницу, разность соседних элементов --- высота ступеней. Имеется животное, способное преодолевать ступени высоты не больше $h$, оно сидит в начале лестницы. До какого элемента массива оно может добраться по этой лестнице?',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole h, whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var i=0
            for(;i<args.n-1;++i)
            {
                if(args.a[i+1]-args.a[i]>args.h) break
            }
            return lp().println(i).finish()
        }],
        stdin: '2   7  3 5 7 9 11 14 16',
        stdinHint: 'Введите $h, n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Он описывает что-то вроде лестницы, идущей то вверх, то вниз; разность соседних элементов --- высота ступеней. Имеется животное, способное преодолевать ступени высоты не больше $h$. Куда его можно посадить, чтобы оно не убежало с лестницы? На край лестницы сажать нельзя! Возможно, что подходящего места не найдётся, тогда об этом надо сообщить.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole h, whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()

            var b=new Array(args.n)
            b.fill(false)
            b[0]=b[args.n-1]=true

            for(var i=1;i<args.n-1;++i)
            {
                b[i]=Math.abs(args.a[i-1]-args.a[i])<=args.h&&b[i-1]
                if (!b[i]) break
            }
            for(var i=args.n-2;i>0;--i)
            {
                if (b[i]) break
                else
                {
                    b[i]=Math.abs(args.a[i]-args.a[i+1])<=args.h&&b[i+1]
                    if (!b[i]) break
                }
            }
            var no=true
            b.forEach(function(val,idx){
                if(!val) 
                {
                    printer.print(idx)
                    no=false
                }
            })
            
            if(no) printer.println('Нет подходящего места')

            return printer.finish()
        }],
        stdin: '2   7     3 5    8 9 11 12   15',
        stdinHint: 'Введите $h, n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан упорядоченный массив целых чисел. Он описывает лестницу, разность соседних элементов --- высота ступеней; одинаковые элементы образуют широкие ступени. Сколько ступеней в лестнице? Например, в массиве [2,2,2] одна ступень, в массиве [2,3,3] их две.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var c=1
            for(var i=0;i<args.n-1;++i)
            {
                if(args.a[i+1]!=args.a[i]) c++
            }
            return lp().println(c).finish()
        }],
        stdin: '7  3 5 5 5 7 7 8',
        stdinHint: 'Введите $n, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Дан неупорядоченный массив целых чисел. Он описывает что-то вроде лестницы, идущей то вверх, то вниз; разность соседних элементов --- высота ступеней. Имеется животное, способное преодолевать ступени высоты не больше $h$ вверх и не больше $H$ вниз. Животное находится в начале массива. До какого элемента сможет дойти животное?',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole h, whole H, whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var i=0
            for(;i<args.n-1;++i)
            {
                var t=args.a[i+1]-args.a[i]
                if(t>args.h || -t>args.H) break
            }
            return lp().println(i).finish()
        }],
        stdin: '2 4   7  3 5 7 3 4 1 3 ',
        stdinHint: 'Введите $h, H, a_1, \\ldots, a_n$'
    },
    {
        text: [
            'Задано натуральное число. Написать программу, генерирующую массив делителей этого числа и вычисляющую среднее арифметическое этих делителей. Массив и среднее арифметическое вывести на экран.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            
            //var a=new Array
            var s=0,count=0
            for(var i=1;i<=args.n/2;++i)
            {
                if(args.n%i==0)
                {
                    printer.print(i)
                    s+=i
                    count++
                }
            }
            printer.println('\nСреднее арифметическое=',s/count)
            return printer.finish()
        }],
        stdin: '28',
        stdinHint: 'Введите $n$'
    },
    { //17
        text: [
            'Задан упорядоченный по возрастанию массив $v$ произвольной длины и натуральное число $n$. Написать программу, выполняющую $n$ раз следующее:',
            '<ul>',
            '<li> Вычисляется значение $p$ --- среднее арифметическое элементов $v$.</li>',
            '<li> Полученное значение $p$ вставляется в $v$ так, что $v$ остается упорядоченным.</li>',
            '</ul>',
            'Исходный массив и результат $n$ вставок следует вывести на консоль. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, whole s,  int a[s]')
            if (args.s > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.a.join(' '))
            for(var i=0;i<args.n;++i)
            {
                var s=0
                args.a.forEach(function(val){s+=val})
                var avg=s/args.a.length
                for(var j=0;j<args.a.length;++j)
                {
                    if(args.a[j]>avg)
                    {
                        args.a.splice(j,0,avg)
                        break
                    }
                }
            }
            printer.println(args.a.join(' '))
            return printer.finish()
        }],
        stdin: '5  5  2 5 8 15 20 ',
        stdinHint: 'Введите $n, s, a_1, \\ldots, a_s$'
    },
    { //18
        text: [
            'Задан упорядоченный по возрастанию массив $v$ произвольной длины и натуральное число $n$. Написать программу, выполняющую $n$ раз следующее:',
            '\\begin{itemize}',
            '\\item Находится индекс $i$, такой, что $|v[i]-v[i+1]|=max$.',
            '\\item Среднее значение $v[i]$ и $v[i+1]$ вставляется в $v$ перед $v[i+1]$.',
            '\\end{itemize}',
            'Исходный массив и результат $n$ вставок следует вывести на консоль. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, whole s,  int a[s]')
            if (args.s > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.a.join(' '))
            for(var i=0;i<args.n;++i)
            {
                var max=0,idx=0
                for(var j=0;j<args.a.length-1;++j)
                {
                    var m=args.a[j+1]-args.a[j]
                    if(m>max)
                    {
                        max=m
                        idx=j
                    }
                }
                args.a.splice(idx+1,0,(args.a[idx]+args.a[idx+1])/2)
            }
            printer.println(args.a.join(' '))
            return printer.finish()
        }],
        stdin: '5  5  2 5 8 15 20 ',
        stdinHint: 'Введите $n, s, a_1, \\ldots, a_s$'
    },
    { //19
        text: [
            'Задан массив $v$ произвольной длины. Написать программу, генерирующую целочисленный массив $w$ такой же длины, где $w[i]$ --- число элементов $v[j]$, таких, что $v[j]>v[i]$ при $j>i$.',
            'Программа должна выводить на консоль оба массива. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n,int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.a.join(' '))
            var w = new Array
            for(var i=0;i<args.n;++i)
            {
                var s=0
                for(var j=i;j<args.n;++j)
                {
                    if(args.a[j]>args.a[i]) ++s
                }
                w.push(s)
            }
            printer.println(w.join(' '))
            return printer.finish()
        }],
        stdin: '10  5 2 5 8 1 4 15 20 1 25',
        stdinHint: 'Введите $n, v_1, \\ldots, v_n$'
    },
    { //20
        text: [
            'Задан массив $v$ произвольной длины, в нем допустимы одинаковые элементы. Составить программу, генерирующую массив $w$, содержащий те же элементы, но только один раз. Например, $v=[1,-2, 3, 1,-2,4]$, $w=[1,-2,3,4]$.',
            'Программа должна выводить на консоль оба массива. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()

            printer.println(args.a.join(' '))

            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index
            }

            printer.println((args.a.filter(onlyUnique)).join(' '))
            
            return printer.finish()
        }],
        stdin: '10  5 2 5 8 1 4 15 20 1 25',
        stdinHint: 'Введите $n, v_1, \\ldots, v_n$'
    },
    { //21
        text: [
            'Задан массив $v$ произвольной длины и число $d$. Написать программу, генерирующую массив $w$, полученный из $v$ исключением элемента, ближайшего к $d$.',
            'Программа должна выводить на консоль оба массива. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'int d, whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.a.join(' '))

            var diff=Math.abs(args.a[0]-args.d)
            var d_val=args.a[0]
            args.a.forEach(function(val,idx){
                var t=Math.abs(val-args.d)
                if(t<diff)
                {
                    diff=t
                    d_val=val
                }
            })
            
            printer.println(args.a.filter(function(val){return val!=d_val}) )

            return printer.finish()
        }],
        stdin: '7  10  5 2 5 8 1 4 15 20 1 25',
        stdinHint: 'Введите $d, n, v_1, \\ldots, v_n$'
    },
    { //22
        text: [
            'Задан числовой $v$ массив произвольной длины. Сгенерировать массив $w$, такой, что $w[i]$ --- среднее арифметическое всех элементов $v$ за исключением $v[i]$.',
            'Программа должна выводить на консоль оба массива. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int a[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.a.join(' '))

            var w = new Array
            args.a.forEach(function(val,idx){
                var s=0
                args.a.forEach(function(val2,idx2){ if(idx!=idx2) s+=val2})
                w.push(s/(args.n-1))
            })
            printer.println(w.join(' '))

            return printer.finish()
        }],
        stdin: '5   2 4 6 8 10',
        stdinHint: 'Введите $n, v_1, \\ldots, v_n$'
    },
    { //23
        text: [
            'Задан числовой массив $v$ произвольной длины $n$. Обозначим $a_k = \\sum\\limits_{i=0}^{k-1}{v[i]}$, $b_k = \\sum\\limits_{i=k+1}^{n-1}{v[i]}$. Сгенерировать массивы чисел $a_k$ и $b_k$, найти индекс $k$, для которого $|a_k-b_k|=min$. Программа должна выводить на консоль все три массива и найденный индекс. Массивы выводить в строку, отделяя элементы пробелами. Каждый массив начинать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int v[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.v.join(' '))

            var a = new Array
            var b = new Array
            args.v.forEach(function(val,k){
                var s=0
                for(var i=0;i<k;++i) s+=args.v[i]
                a.push(s)

                s=0
                for(i=k+1;i<args.n;++i) s+=args.v[i]
                b.push(s)
            })

            var idx=0,min=Math.abs(a[0]-b[0])
            for(var i=1;i<args.n;++i)
            {
                var m=Math.abs(a[i]-b[i])
                if(m<min){
                    min=m
                    idx=i
                }
            }
            printer.println(a.join(' '))
            printer.println(b.join(' '))
            printer.println(idx)
            return printer.finish()
        }],
        stdin: '5   2 4 6 8 10',
        stdinHint: 'Введите $n, v_1, \\ldots, v_n$'
    },
    {
        text: [
            'Задан числовой массив $v$ произвольной длины $n$. Преобразовать его следующим образом: если $v[i] > v[i-1]$ и $v[i] > v[i+1]$, то $v[i]$ присвоить среднее $v[i-1]$ и $v[i+1]$. Вывести оба массива в строку, каждый массив начать с новой строки.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int v[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            printer.println(args.v.join(' '))
            for(var i=1;i!=args.n-1;++i)
            {
                if (args.v[i]>args.v[i+1]&&args.v[i]>args.v[i-1]) args.v[i]=(args.v[i-1]+args.v[i+1])/2
            }
            printer.println(args.v.join(' '))
            return printer.finish()
        }],
        stdin: '10  5 1 10 5 20 9 3 20 1 25',
        stdinHint: 'Введите $n, v_0, \\ldots, v_n$'
    },
    { //25
        text: [
            'Задан целочисленный массив $v$ произвольной длины $n$. Вывести на экран индексы четных элементов $v$, но только тех, за которыми непосредственно следует нечетный элемент. Например, $v=[1,2,3,4,6,7,8]\\rightarrow[1,4]$',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n, int v[n]')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()
            for(var i=0;i!=args.n-1;++i)
            {
                if(args.v[i]%2==0&&args.v[i+1]%2!=0) printer.print(i)
            }
            return printer.finish()
        }],
        stdin: '10  5 2 5 8 2 4 15 20 1 25',
        stdinHint: 'Введите $n, v_0, \\ldots, v_n$'
    },
    { //26
        text: [
            'Написать программу, генерирующую $n$ чисел $F_k$, где $n$ --- произвольное натуральное число. Числа $F_k$ задаются соотношением: $F_0=0$, $F_1=1$, $F_k=F_{k-1}+F_{k-2}$. Например, для $n=7$ $F=[0,1,1,2,3,5,8]$.',
            '<br>'].join('\n'),
        scene: ['program', function(stdin) {
            var args = ppi(stdin, 'whole n')
            if (args.n > 100)
                throw new Error('Слишком большое n')
            var printer=lp()

            var f2=0,f1=1
            var f
            for(var i=0;i!=args.n;++i)
            {
                if (i<=1) f=i
                else
                {
                    f=f2+f1
                    f2=f1
                    f1=f
                }
                printer.print(f)
            }
            return printer.finish()
        }],
        stdin: '7',
        stdinHint: 'Введите $n$'
    },
    ]
})


// 23 -- вопрос по индексам а и b: a[0] и b[n-1]
// 19 -- тире
// 17,18 -- список в оформлении условия