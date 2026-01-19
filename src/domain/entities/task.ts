import { Status, TaskId, TaskTitle } from "../value-objects/index.ts"

class Task {
    private constructor(
    private readonly id: TaskId,
    private readonly title: TaskTitle,
    private status: Status,
    public readonly createdAt: Date,
    private completedAt?: Date
    ){}

    static create(id: TaskId, title: TaskTitle, status: Status): Task {
        return new Task(id,title,status,new Date())
    }
    
    completed(): void {
        if (this.status.isCompleted()){
            throw new Error('すでに完了済みです')
        }
        this.status = Status.completed();
        this.completedAt = new Date();
    }
}
