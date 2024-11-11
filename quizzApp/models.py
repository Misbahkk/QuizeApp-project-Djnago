from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime,timedelta

class User(AbstractUser):
    name =  models.CharField(max_length=255)
    email = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    username =  None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
    ]
    
    role = models.CharField(max_length=7, choices=ROLE_CHOICES, default='student')
    
    #   # Password reset fields
    # reset_token = models.CharField(max_length=30, null=True, blank=True)
    # reset_token_expiry = models.DateTimeField(null=True, blank=True)



    # OTP fields for password reset
    otp_code = models.CharField(max_length=4, null=True, blank=True)
    otp_expiry = models.DateTimeField(null=True, blank=True)

    def set_otp(self):
        from random import randint
        self.otp_code = str(randint(1000, 9999))  # Generate a 4-digit OTP
        self.otp_expiry = datetime.now() + timedelta(minutes=10)  # OTP expires in 10 minutes
        self.save()