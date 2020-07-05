from django.contrib import admin
from .models import Courses,Section,Lessons

# Register your models here.
admin.site.register(Courses)
admin.site.register(Section)
admin.site.register(Lessons)
