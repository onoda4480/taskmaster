class Status {
    private readonly status: 'pending' | 'completed';

    private constructor(status: 'pending' | 'completed') {
        this.status = status;
    }

    static pending(): Status {
        return new Status('pending');
    }

    static completed(): Status {
        return new Status('completed');
    }

    isCompleted(): boolean {
        return this.status === 'completed';
    }
}
export { Status };