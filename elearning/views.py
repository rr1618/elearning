
from .models import Courses, Section, Lessons
from rest_framework import viewsets, status
from .serializer import CourseSerializer, SectionSerializer, LessonSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CourseSerializer


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Section.objects.all()
        course = self.request.query_params.get('course', '')
        section = self.request.query_params.get('section', '')
        if course and section:
            print("entered")
            return queryset.filter(course=course, pk=section)
        if course:
            print("not entered")
            return queryset.filter(course=course)
        return queryset


class LesssonViewSet(viewsets.ModelViewSet):
    queryset = Lessons.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = LessonSerializer

    def get_queryset(self):
        queryset = Lessons.objects.all()
        course = self.request.query_params.get('course', '')
        section = self.request.query_params.get('section', '')
        if course and section:
            print("entered")
            return queryset.filter(course=course, section=section)
        return queryset
