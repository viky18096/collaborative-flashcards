from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

# Association table for study groups
study_group_members = Table(
    'study_group_members',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('group_id', Integer, ForeignKey('study_groups.id'))
)

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    flashcards = relationship("Flashcard", back_populates="creator")
    study_groups = relationship("StudyGroup", secondary=study_group_members, back_populates="members")

class StudyGroup(Base):
    __tablename__ = 'study_groups'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    members = relationship("User", secondary=study_group_members, back_populates="study_groups")
    flashcards = relationship("Flashcard", back_populates="study_group")

class Flashcard(Base):
    __tablename__ = 'flashcards'
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
    question_type = Column(String)  # text, image, formula
    creator_id = Column(Integer, ForeignKey('users.id'))
    study_group_id = Column(Integer, ForeignKey('study_groups.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    last_reviewed = Column(DateTime)
    next_review = Column(DateTime)
    difficulty = Column(Integer)  # 1-5 scale
    whiteboard_state = Column(JSON)  # Store TLDraw state as JSON
    
    # Relationships
    creator = relationship("User", back_populates="flashcards")
    study_group = relationship("StudyGroup", back_populates="flashcards")
    review_history = relationship("ReviewHistory", back_populates="flashcard")

class ReviewHistory(Base):
    __tablename__ = 'review_history'
    
    id = Column(Integer, primary_key=True, index=True)
    flashcard_id = Column(Integer, ForeignKey('flashcards.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    reviewed_at = Column(DateTime, default=datetime.utcnow)
    performance_rating = Column(Integer)  # 1-5 scale
    whiteboard_snapshot = Column(JSON)  # Store TLDraw state as JSON
    
    # Relationships
    flashcard = relationship("Flashcard", back_populates="review_history")
