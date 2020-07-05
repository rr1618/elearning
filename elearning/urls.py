from django.contrib import admin
from django.urls import path , include
from rest_framework import routers
from .views import CourseViewSet,SectionViewSet,LesssonViewSet
router = routers.DefaultRouter()
router.register(r'course', CourseViewSet)
router.register(r'section', SectionViewSet)
router.register(r'lesson', LesssonViewSet)
urlpatterns = [
path('', include(router.urls)),
    # path('another', Another.as_view(),name="home"),

]