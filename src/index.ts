// src/index.ts
import { Command } from 'commander';
import { FileTaskRepository } from './infrastructure/task.ts';
import { CreateTaskUseCase } from './application/use-cases/create_task.ts';
import { FinishTaskUseCase } from './application/use-cases/finish_task.ts';
import { ShowTaskUseCase } from './application/use-cases/show_task.ts';
import { TaskId } from './domain/value-objects/task_id.ts';

const program = new Command();
const repository = new FileTaskRepository();

program
    .name('taskmaster')
    .description('タスク管理CLI')
    .version('1.0.0');

// タスク作成コマンド
program
    .command('add <title>')
    .description('新しいタスクを作成')
    .action(async (title: string) => {
        const useCase = new CreateTaskUseCase(repository);
        const task = await useCase.execute(title);
        console.log(`✅ タスクを作成しました: ID=${task.getId().getValue()}`);
    });

// タスク完了コマンド
program
    .command('done <id>')
    .description('タスクを完了にする')
    .action(async (id: string) => {
        const useCase = new FinishTaskUseCase(repository);
        const taskId = TaskId.create(Number(id));
        const task = await useCase.execute(taskId);
        console.log(`✅ タスクを完了しました: ID=${task.getId().getValue()}`);
    });

// タスク一覧コマンド
program
    .command('list')
    .description('タスク一覧を表示')
    .action(async () => {
        const useCase = new ShowTaskUseCase(repository);
        const tasks = await useCase.execute();
        tasks.forEach(t => {
            const json = t.toJSON();
            console.log(`[${json.id}] ${json.title} - ${json.status}`);
        });
    });

program.parse();