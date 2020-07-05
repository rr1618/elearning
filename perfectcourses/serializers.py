from django.contrib.auth.models import User,Group
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Courses,CourseDetails
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','last_name','email','username','password']
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields= ['id','title',]
class CourseDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetails
        fields = ['course','topics']