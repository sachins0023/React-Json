from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    skills = serializers.ReadOnlyField(source='skills_array')
    
    class Meta:
        model = Student
        fields = ('firstName','lastName', 'skills')
        
class StudentCreateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Student
        fields = ('firstName','lastName', 'skills')