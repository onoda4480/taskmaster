import type { TaskRepository } from "../../domain/repositories/index.ts"
import { Task } from "../../domain/entities/task.ts";
import { TaskId } from "../../domain/value-objects/task_id.ts";
import { promises as fs } from 'fs';

class FileTaskRepository implements TaskRepository {
    async save(task: Task): Promise<void> {
        try {
            const data = await fs.readFile('./data.json', 'utf-8');
            const tasks = JSON.parse(data);
            tasks.push(task);
            await fs.writeFile('./data.json', JSON.stringify(tasks, null, 2));
        } catch {
            await fs.writeFile('./data.json', JSON.stringify([task], null, 2));
        }
    }
    async findById(id: TaskId): Promise<Task | null> {
        const data = await fs.readFile('./data.json', 'utf-8');
        const tasks = JSON.parse(data)

        const taskData = tasks.find((t: any) => t.id === id.getValue());
        return taskData || null;
    };
    async findAll(): Promise<Task[]> {
        const data = await fs.readFile('./data.json', 'utf-8');
        const tasks = JSON.parse(data)
        return tasks
    };
    async update(task: Task): Promise<void> {
        const data = await fs.readFile('./data.json', 'utf-8');
        const tasks = JSON.parse(data);

        const index = tasks.findIndex((t: any) => t.id === task.getId().getValue());

        if (index !== -1) {
            tasks[index] = task;
        }
        await fs.writeFile('./data.json', JSON.stringify(tasks, null, 2));
    }
};