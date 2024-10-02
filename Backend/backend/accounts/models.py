from django.db import models # type: ignore
from django.contrib.auth.models import AbstractUser # type: ignore

# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def _str_(self):
        return self.email