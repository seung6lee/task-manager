class subject extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const info = document.createElement('div')
        info.innerText = '과목별 난이도 수정'
        info.id = 'addInfo'

        const box1 = document.createElement('div')
        box1.id = 'box1'
        const box2 = document.createElement('div')
        box2.id = 'box2'
        const box3 = document.createElement('div')
        box3.id = 'box3'

        box1.appendChild(box2)
        box1.appendChild(box3)

        fetch('/all', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => {
                let subject, p, inputt
                for (subject in res.subjects) {
                    p = document.createElement('p')
                    p.innerText = `${subject}:`
                    box2.appendChild(p)

                    inputt = document.createElement('input')
                    inputt.type = 'range'
                    inputt.id = `${subject}-difficulty`
                    inputt.min = '1'
                    inputt.max = '5'
                    inputt.value = res.subjects[subject]
                    inputt.name = 'name'
                    box3.appendChild(inputt)
                }
            })


        const addButtons = document.createElement('div')
        addButtons.id = 'addButtons'

        const confirm = document.createElement('div')
        confirm.id = 'subjectConfirm'
        confirm.innerText = '확인'

        const cancel = document.createElement('div')
        cancel.id = 'subjectCancel'
        cancel.innerText = '취소'


        this.appendChild(info)
        this.appendChild(box1)
        addButtons.appendChild(confirm)
        addButtons.appendChild(cancel)
        this.appendChild(addButtons)

        this.id = 'SubjectBox'
    }
}

customElements.define('subject-board', subject)