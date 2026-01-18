# TaskMaster 設計書

## 1. ドメインモデル

### ユビキタス言語
- **Task（タスク）**: 実行すべき作業単位
- **TaskId**: タスクの一意識別子
- **Title**: タスクのタイトル
- **Status**: タスクの状態（Pending/Completed）
- **CreatedAt**: 作成日時
- **CompletedAt**: 完了日時（任意）

### エンティティ

#### Task Entity
```typescript
class Task {
  private constructor(
    public readonly id: TaskId,
    public readonly title: Title,
    private status: Status,
    public readonly createdAt: Date,
    private completedAt?: Date
  ) {}
}
```

### 値オブジェクト
- TaskId: UUID形式の識別子
- Title: 1-100文字の文字列
- Status: 'pending' | 'completed'

### 集約
- Task集約: Taskエンティティをルートとする

## 2. レイヤー構造
```
src/
├── domain/           # ドメイン層
│   ├── entities/
│   ├── value-objects/
│   └── repositories/
├── application/      # アプリケーション層
│   └── use-cases/
├── infrastructure/   # インフラ層
│   ├── persistence/
│   └── cli/
└── index.ts         # エントリーポイント
```

## 3. ユースケース

### UC-01: タスク作成
- アクター: ユーザー
- 事前条件: なし
- 事後条件: 新しいタスクが保存される
- 主フロー:
  1. ユーザーがタスクタイトルを入力
  2. システムがTaskエンティティを生成
  3. システムがタスクを永続化

### UC-02: タスク完了
- アクター: ユーザー
- 事前条件: タスクが存在する
- 事後条件: タスクの状態がCompletedになる

### UC-03: タスク一覧表示
- アクター: ユーザー
- 事前条件: なし
- 事後条件: タスク一覧が表示される

## 4. 技術スタック
- 言語: TypeScript
- ランタイム: Node.js
- 永続化: JSON ファイル
- CLI: Commander.js
- テスト: Jest

## 5. リポジトリインターフェース
```typescript
interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: TaskId): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  update(task: Task): Promise<void>;
}
```