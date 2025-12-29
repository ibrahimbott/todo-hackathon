from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlmodel import Session
from uuid import UUID
from backend_workaround.database.session import get_session
from backend_workaround.models.task import Task, TaskCreate, TaskUpdate
from backend_workaround.services.task_service import TaskService
from backend_workaround.repositories.task_repository import TaskRepository


router = APIRouter()


def get_task_service(session: Session = Depends(get_session)):
    repository = TaskRepository()
    return TaskService(repository)


@router.get("/", response_model=List[Task])
def read_tasks(
    task_service: TaskService = Depends(get_task_service)
) -> List[Task]:
    return task_service.get_all_tasks(task_service.repository.session)


@router.post("/", response_model=Task)
def create_task(
    task: TaskCreate,
    task_service: TaskService = Depends(get_task_service)
) -> Task:
    return task_service.create_task(task_service.repository.session, task)


@router.get("/{task_id}", response_model=Task)
def read_task(
    task_id: UUID,
    task_service: TaskService = Depends(get_task_service)
) -> Task:
    task = task_service.get_task(task_service.repository.session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=Task)
def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    task_service: TaskService = Depends(get_task_service)
) -> Task:
    updated_task = task_service.update_task(
        task_service.repository.session, task_id, task_update
    )
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@router.patch("/{task_id}/complete", response_model=Task)
def complete_task(
    task_id: UUID,
    completed: bool,
    task_service: TaskService = Depends(get_task_service)
) -> Task:
    task = task_service.complete_task(
        task_service.repository.session, task_id, completed
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: UUID,
    task_service: TaskService = Depends(get_task_service)
) -> dict:
    if not task_service.delete_task(task_service.repository.session, task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}