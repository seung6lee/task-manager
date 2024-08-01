class add extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {

        const info = document.createElement('div')
        info.innerText = '새 과제 추가하기'
        info.id = 'addInfo'

        const box1 = document.createElement('div')
        box1.id = 'box1'
        const box2 = document.createElement('div')
        box2.id = 'box2'
        const box3 = document.createElement('div')
        box3.id = 'box3'

        box1.appendChild(box2)
        box1.appendChild(box3)

        let i, p
        for (i of ['과제명', '과목', '마감일', '성적 반영 여부']) {
            p = document.createElement('p')
            p.innerText = `${i}:`
            box2.appendChild(p)
        }


        const name = document.createElement('input')
        name.type = 'text'
        name.id = 'addName'
        name.name = 'name'

        const subject = document.createElement('select')
        subject.name = 'subject'
        subject.id = 'addSubject'
        let option
        for (i of ['korean', 'math', 'society', 'science', 'english', 'history']) {
            option = document.createElement('option')
            option.value = i
            option.innerText = i
            subject.appendChild(option)
        }

        const date = document.createElement('input')
        date.type = 'date'
        date.id = 'addDate'
        date.name = 'date'

        const grade = document.createElement('input')
        grade.type = 'checkbox'
        grade.id = 'addGrade'
        grade.name = 'grade'

        box3.appendChild(name)
        box3.appendChild(subject)
        box3.appendChild(date)
        box3.appendChild(grade)

        this.appendChild(info)
        this.appendChild(box1)

        const addButtons = document.createElement('div')
        addButtons.id = 'addButtons'

        const confirm = document.createElement('div')
        confirm.id = 'addConfirm'
        confirm.innerText = '확인'

        const cancel = document.createElement('div')
        cancel.id = 'addCancel'
        cancel.innerText = '취소'

        addButtons.appendChild(confirm)
        addButtons.appendChild(cancel)
        this.appendChild(addButtons)

        this.id = 'addTaskBox'
    }
}

customElements.define('add-board', add)