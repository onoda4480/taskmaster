class TaskTitle {
    private readonly title : string;

    private constructor(title : string) {
        this.title = title
    }

    static create(title:string): TaskTitle {
        const trimmed = title.trim();
        if (trimmed.length === 0) {
            throw new Error('タイトルは一文字以上必要です。')
        }
        if (trimmed.length > 100) {
            throw new Error('タイトルは100文字以下です。')
        }
        return new TaskTitle(trimmed);
    }

    getValue(): string {
        return this.title;
    }

    equals(other: TaskTitle): boolean {
        return this.title === other.title;
    }
}
export {TaskTitle}