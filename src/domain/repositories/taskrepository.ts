import { Task } from "../entities/task.ts";
import { TaskId } from "../value-objects/task_id.ts";

interface TaskRepository {
    save(task: Task): Promise<void>;
    findById(id: TaskId): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    update(task: Task): Promise<void>;
}
export type { TaskRepository }