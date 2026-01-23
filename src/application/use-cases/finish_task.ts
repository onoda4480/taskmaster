import type { TaskRepository } from "../../domain/repositories/index.ts"
import { Task } from "../../domain/entities/task.ts"
import type { TaskId } from "../../domain/value-objects/task_id.ts";

export class FinishTaskUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(id: TaskId): Promise<Task> {
        const task = await this.taskRepository.findById(id);
        if (task === null){
            throw new Error(`タスクが見つかりません: ID=${id.getValue()}`);
        };
        task.completed();

        await this.taskRepository.update(task)
        return task
    }
}