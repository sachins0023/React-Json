from .views import *
from django.urls import path

app_name = "ReactApp"

urlpatterns = [
    path("students/", api_students_list_view, name="student_list"),
    path("create/", api_create_student_view, name="create_student"),
]
