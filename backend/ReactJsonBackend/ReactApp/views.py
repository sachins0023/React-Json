from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer, StudentCreateSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET',])
def api_students_list_view(request):
    student = list(Student.objects.all())
    if request.method == 'GET':
        serializer = StudentSerializer(student, many=True)
        return Response(serializer.data)
    
@api_view(['POST',])
def api_create_student_view(request):
    if request.method == "POST":
        serializer = StudentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {}
            data["Success"] = "Created Succesfully"
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)