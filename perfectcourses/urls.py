from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import obtain_auth_token
router = routers.DefaultRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'courseDetail', views.CourseDetailsViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),

]