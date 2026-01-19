class TaskId {
    private readonly id : number;

    private constructor(id: number) {
        this.id = id
    }

    static create(id: number): TaskId {
        if (id <= 0) {
            throw new Error('idが0以下です')
        }
        return new TaskId(id);
    }
    getValue(): number {
        return this.id;
    }
    equals(other: TaskId): boolean {
        return this.id === other.id
    }
}
export {TaskId}