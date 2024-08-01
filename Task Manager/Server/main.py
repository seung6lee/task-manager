from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import json

app = FastAPI()

class SubectsItem(BaseModel):
    korean: int
    math: int
    society: int
    science: int
    english: int
    history: int

class TaskItem(BaseModel):
    name: str
    subject: str
    date: str
    grade: int

class removeItem(BaseModel):
    name: str

@app.get('/')
async def main():
    with open('data.json', 'r', encoding='utf8') as file:
        data = json.load(file)

    data = schedule(data)
    return data


@app.post('/subjects')
async def subjects(request: SubectsItem):
    print(request)
    with open('data.json', 'r', encoding='utf8') as file:
        data = json.load(file)

    for i in ['korean', 'math', 'society', 'science', 'english', 'history']:
        data['subjects'][i] = getattr(request, i)

    data = json.dumps(data, indent=4)

    with open('data.json', 'w', encoding='utf8') as file:
        file.write(data)

    return {"status": "Success"}



@app.post('/add')
async def task(request: TaskItem):
    with open('data.json', 'r', encoding='utf8') as file:
        data = json.load(file)

    data['tasks'].append([request.name, request.subject, request.date, request.grade])

    data = schedule(data)

    data = json.dumps(data, indent=4)

    with open('data.json', 'w', encoding='utf8') as file:
        file.write(data)
    
    return {"status": "Success"}


def schedule(data):
    a = [i for i in data['tasks']]
    print(a)

    for task in data['tasks']:
        leftTime = (datetime.strptime(task[2], "%Y-%m-%d") - datetime.now()).total_seconds() / 3600

        timeWeight = -1 if leftTime > 120 else (-1 * leftTime + 120) * 5 / 12
        gradeWeight = 0 if task[3] == 0 else 25
        subjectWeight = data['subjects'][task[1]] * 5
        
        total = timeWeight + gradeWeight + subjectWeight
        task.append(total)

    data['tasks'].sort(key=lambda x:x[4], reverse=True)
    data['tasks'] = [i[:4] for i in data['tasks']]
    print(data)
    return data


@app.post('/remove')
async def task(request: removeItem):
    with open('data.json', 'r', encoding='utf8') as file:
        data = json.load(file)

    for task in data['tasks']:
        if task[0] == request.name:
            print('same')
            data['tasks'].remove(task)

    data = json.dumps(data, indent=4)

    with open('data.json', 'w', encoding='utf8') as file:
        file.write(data)
    
    return {"status": "Success"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)