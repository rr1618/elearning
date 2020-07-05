from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

class Courses(models.Model):
    title = models.CharField(max_length= 30,unique=True)
    def __str__(self):
        return self.title
class CourseDetails(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE,default='')
    topics = models.CharField(max_length=150 ,default='')

    def __str__(self):
        return self.topics
class CourseSubTopics(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, default='')
    courseDetails = models.ForeignKey(CourseDetails, on_delete=models.CASCADE,default='')
    subTopics = models.CharField(max_length=200,default='')
    videolink = models.CharField(max_length=500,default='')
    def __str__(self):
        return self.subTopics
