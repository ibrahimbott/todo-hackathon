from typing import List, Optional
from sqlmodel import Session
from uuid import UUID
from backend_workaround.models.task import Task, TaskCreate, TaskUpdate
from backend_workaround.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def create_task(self, session: Session, task: TaskCreate) -> Task:
        return self.repository.create_task(session, task)

    def get_task(self, session: Session, task_id: UUID) -> Optional[Task]:
        return self.repository.get_task(session, task_id)

    def get_all_tasks(self, session: Session) -> List[Task]:
        return self.repository.get_tasks(session)

    def update_task(self, session: Session, task_id: UUID, task_update: TaskUpdate) -> Optional[Task]:
        task_data = task_update.model_dump(exclude_unset=True)
        return self.repository.update_task(session, task_id, task_data)

    def delete_task(self, session: Session, task_id: UUID) -> bool:
        return self.repository.delete_task(session, task_id)

    def complete_task(self, session: Session, task_id: UUID, completed: bool) -> Optional[Task]:
        return self.repository.update_task(session, task_id, {"completed": completed})