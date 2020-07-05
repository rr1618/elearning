# from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User, auth
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework.response import Response
from .models import Courses,CourseDetails,CourseSubTopics
from rest_framework.decorators import action
from rest_framework import viewsets ,status
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .serializers import CourseSerializer,CourseDetailsSerializer,UserSerializer
# from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework.permissions import IsAuthenticated , AllowAny
# Create your views here.




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        data =request.data
        try:
            user = User.objects.create_user(username=data['username'],email=data['email'],password=data['password'],
                                        first_name=data['first_name'],last_name=data['last_name'])
            return Response({'message':'user created'})
        except :
            return Response({'message':'email already exists'})


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CourseSerializer


class CourseDetailsViewSet(viewsets.ModelViewSet):
    queryset = CourseDetails.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CourseDetailsSerializer
    @action(detail=True,methods=['GET'])
    def course_details(self,request,pk=None):
        courseName = Courses.objects.get(id=pk)        #get the course name
        subTopicList = {}
        for cd in CourseDetails.objects.filter(course=courseName):
            courseSubTopics=CourseSubTopics.objects.filter(course=courseName, courseDetails=cd)
            subTopicList[cd.topics]=[]
            for i in courseSubTopics:
                subTopicList[cd.topics].append([str(i.subTopics),i.videolink])
        return Response({'data':subTopicList},status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET','POST'])
def loginRequest(request):
    if (request.method == "POST"):
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(password=password, username=username)
        if (user is not None):
            auth.login(request, user)
            print('login successful')
            return HttpResponse("logged in")
        else:
            return HttpResponse("not logged in")

@login_required
def logout_request(request):
    auth.logout(request)
    return
