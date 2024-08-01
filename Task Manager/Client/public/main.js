function removeTask(name) {
    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
        }),
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            reloadTask()
        })
        .catch(error => {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        })
}

function reloadTask() {
    const main = document.getElementById('main')
    main.innerHTML = ''
    main.appendChild(document.createElement('task-board'))

    const addButton = document.getElementById('addTask')

    addButton.addEventListener("click", function () {
        if (document.getElementById('addTaskBox')) {
            document.getElementById('addTaskBox').remove()
            document.getElementById('main').style.filter = '';
        } else {
            document.body.appendChild(document.createElement('add-board'))
            document.getElementById('main').style.filter = 'blur(5px)';

            const addConfirm = document.getElementById('addConfirm')

            addConfirm.addEventListener("click", function () {
                name = document.getElementById('addName').value
                subject = document.getElementById('addSubject').value
                date = document.getElementById('addDate').value
                grade = document.getElementById('addGrade').checked

                console.log(name, subject, date, grade)

                if (!name || !subject || !date) {
                    alert('모든 값을 채워주세요')
                } else {
                    fetch('/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            subject: subject,
                            date: date,
                            grade: (grade == true) ? 1 : 0
                        }),
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return res.json();
                        })
                        .then(res => {
                            console.log(res)
                            reloadTask()
                            document.getElementById('main').style.filter = ''
                            document.getElementById('addTaskBox').remove()
                        })
                        .catch(error => {
                            console.error('Error:', error)
                            res.status(500).send('Internal Server Error')
                        })
                }
            })

            const addCancel = document.getElementById('addCancel')

            addCancel.addEventListener("click", function () {
                document.getElementById('main').style.filter = ''
                document.getElementById('addTaskBox').remove()
            })
        }
    })
}

window.onload = function () {
    const subjectBtn = document.getElementById('subject')

    subjectBtn.addEventListener("click", function () {
        if (document.getElementById('SubjectBox')) {
            document.getElementById('SubjectBox').remove()
            document.getElementById('main').style.filter = '';
        } else {
            document.body.appendChild(document.createElement('subject-board'))
            document.getElementById('main').style.filter = 'blur(5px)';

            const subjectConfirm = document.getElementById('subjectConfirm')

            subjectConfirm.addEventListener("click", function () {

                console.log('hello')
                fetch('/subjects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        korean: Number(document.getElementById('korean-difficulty').value),
                        math: Number(document.getElementById('math-difficulty').value),
                        society: Number(document.getElementById('society-difficulty').value),
                        science: Number(document.getElementById('science-difficulty').value),
                        english: Number(document.getElementById('english-difficulty').value),
                        history: Number(document.getElementById('history-difficulty').value)
                    }),
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(res => {
                        console.log(res)
                        reloadTask()
                        document.getElementById('main').style.filter = ''
                        document.getElementById('SubjectBox').remove()
                    })
                    .catch(error => {
                        console.error('Error:', error)
                        res.status(500).send('Internal Server Error')
                    })
            })

            const subjectCancel = document.getElementById('subjectCancel')

            subjectCancel.addEventListener("click", function () {
                document.getElementById('main').style.filter = ''
                document.getElementById('SubjectBox').remove()
            })
        }
    })

    reloadTask()
}