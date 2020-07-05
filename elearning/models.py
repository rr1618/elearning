from django.db import models

# Create your models here.
class Courses(models.Model):
    title = models.CharField(max_length= 30,unique=True)
    def __str__(self):
        return self.title
class Section(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE,default='')
    section = models.CharField(max_length=150 ,default='')
    def __str__(self):
        return self.section

class Lessons(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, default='')
    section = models.ForeignKey(Section, on_delete=models.CASCADE,default='')
    lesson = models.CharField(max_length=200,default='')
    lessonText = models.CharField(max_length=1000,default='')
    videolink = models.CharField(max_length=500,default='')
    def __str__(self):
        return self.lesson


