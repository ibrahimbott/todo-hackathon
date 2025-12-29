from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend_workaround.core.config import settings


# Create the database engine
engine = create_engine(
    settings.database_url,
    echo=True,  # Set to False in production
    pool_pre_ping=True
)


def get_session():
    with Session(engine) as session:
        yield session