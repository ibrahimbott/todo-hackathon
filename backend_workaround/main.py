from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend_workaround.api.v1.endpoints import tasks
from backend_workaround.core.config import settings


app = FastAPI(title="Todo API", version="1.0.0")


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "localhost:3000", "*"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routes
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.get("/")
def root():
    return {"message": "Welcome to the Todo API"}