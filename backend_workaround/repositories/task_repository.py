from sqlmodel import Session, select
from typing import List, Optional
from backend_workaround.models.task import Task, TaskCreate
from uuid import UUID


class TaskRepository:
    def create_task(self, session: Session, task: TaskCreate) -> Task:
        # Create the task directly from the input data
        db_task = Task(description=task.description, completed=task.completed)
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    def get_task(self, session: Session, task_id: UUID) -> Optional[Task]:
        return session.get(Task, task_id)

    def get_tasks(self, session: Session) -> List[Task]:
        return session.exec(select(Task)).all()

    def update_task(self, session: Session, task_id: UUID, task_data: dict) -> Optional[Task]:
        db_task = session.get(Task, task_id)
        if db_task:
            for key, value in task_data.items():
                setattr(db_task, key, value)
            session.add(db_task)
            session.commit()
            session.refresh(db_task)
        return db_task

    def delete_task(self, session: Session, task_id: UUID) -> bool:
        db_task = session.get(Task, task_id)
        if db_task:
            session.delete(db_task)
            session.commit()
            return True
        return False