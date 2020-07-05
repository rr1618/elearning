from django.contrib import admin
from .models import Courses,CourseDetails,CourseSubTopics
# Register your models here.

admin.site.register(Courses)
admin.site.register(CourseDetails)
admin.site.register(CourseSubTopics)