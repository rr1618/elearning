from rest_framework import serializers
from .models import Courses,Section,Lessons

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
    # course= CourseSerializer()
    class Meta:
        model = Section
        fields = "__all__"
class LessonSerializer(serializers.ModelSerializer):
    # section=SectionSerializer()
    class Meta:
        model = Lessons
        fields = "__all__"


