from django.contrib import admin # type: ignore
from .models import CustomUser
from .forms import CustomUserCreationForm,CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin # type: ignore
# Register your models here.

@admin.register(CustomUser)
class customAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
