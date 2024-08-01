class task extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const addTask = document.createElement('div')
        addTask.innerText = '새 과제 추가하기!'
        addTask.id = 'addTask'
        addTask.className = 'card'
        this.appendChild(addTask)

        fetch('/all', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => {
                let taskCard, info, name, date, finish
                for (let task of res.tasks) {
                    taskCard = document.createElement('div')

                    info = document.createElement('div')
                    name = document.createElement('p')
                    name.innerText = task[0]
                    name.className = 'name'
                    info.appendChild(name)
                    date = document.createElement('p')
                    date.innerText = task[2]
                    date.className = 'date'
                    info.appendChild(date)
                    info.className = 'info'
                    taskCard.appendChild(info)

                    finish = document.createElement('div')
                    // finish.innerText = '완료'
                    finish.className = 'finish'
                    finish.id = `check:${task[0]}`
                    finish.onclick = () => {removeTask(task[0])}
                    taskCard.appendChild(finish)

                    taskCard.className = 'card'
                    this.appendChild(taskCard)
                }
            })
        this.id = 'info'
        this.style.overflowY = 'auto'
    }
}

customElements.define('task-board', task)