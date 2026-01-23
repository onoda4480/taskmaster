import type { TaskRepository } from "../../domain/repositories/index.ts"
import { Task } from "../../domain/entities/task.ts"
import type { TaskId } from "../../domain/value-objects/task_id.ts";

export class FinishTaskUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(): Promise<Task[]> {
        const task = await this.taskRepository.findAll();
        return task
    }
}