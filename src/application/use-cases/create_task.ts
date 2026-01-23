import type { TaskRepository } from "../../domain/repositories/index.ts"
import { Task } from "../../domain/entities/task.ts"
import { TaskTitle } from "../../domain/value-objects/task_title.ts";
import { Status } from "../../domain/value-objects/status.ts";

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(title: string): Promise<Task> {
        const taskId = await this.taskRepository.nextId();
        const taskTitle = TaskTitle.create(title);
        const status = Status.pending();
        const task = Task.create(taskId, taskTitle, status)

        await this.taskRepository.save(task)
        return task
    }
}