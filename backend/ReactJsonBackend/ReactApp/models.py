from django.db import models

# Create your models here.


class Student(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    skills = models.CharField(max_length=200)
    
    def skills_array(self):
        return [x.strip() for x in self.skills.split(',')]
    
    def __str__(self):
        return self.firstName + ' ' + self.lastName