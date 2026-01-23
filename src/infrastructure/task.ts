import type { TaskRepository } from "../domain/repositories/index.ts"
import { Task } from "../domain/entities/task.ts";
import { TaskId } from "../domain/value-objects/task_id.ts";
import { promises as fs } from 'fs';

export class FileTaskRepository implements TaskRepository {
    private readonly path: string;

    constructor(path: string = './data.json') {
        this.path = path;
    }

    async save(task: Task): Promise<void> {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const tasks = JSON.parse(data);
            tasks.push(task.toJSON());  // ✅ シリアライズしてから保存
            await fs.writeFile(this.path, JSON.stringify(tasks, null, 2));
        } catch {
            await fs.writeFile(this.path, JSON.stringify([task.toJSON()], null, 2));
        }
    }

    async findById(id: TaskId): Promise<Task | null> {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const tasks = JSON.parse(data);
            const taskData = tasks.find((t: any) => t.id === id.getValue());
            return taskData ? Task.fromJSON(taskData) : null;  // ✅ Entityに復元
        } catch {
            return null;
        }
    }

    async findAll(): Promise<Task[]> {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const tasks = JSON.parse(data);
            return tasks.map((t: any) => Task.fromJSON(t));  // ✅ Entityに復元
        } catch {
            return [];
        }
    }

    async update(task: Task): Promise<void> {
        const data = await fs.readFile(this.path, 'utf-8');
        const tasks = JSON.parse(data);

        const index = tasks.findIndex((t: any) => t.id === task.getId().getValue());

        if (index !== -1) {
            tasks[index] = task.toJSON();  // ✅ シリアライズしてから保存
        }
        await fs.writeFile(this.path, JSON.stringify(tasks, null, 2));
    }
    
    async nextId(): Promise<TaskId> {
        const tasks = await this.findAll();
        const maxId = tasks.length > 0 
            ? Math.max(...tasks.map(t => t.getId().getValue())) 
            : 0;
        return TaskId.create(maxId + 1);
    }
}