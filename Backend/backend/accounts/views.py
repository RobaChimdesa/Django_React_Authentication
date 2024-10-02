
from django.shortcuts import render  # type: ignore  
from rest_framework.generics import GenericAPIView,RetrieveAPIView  # type: ignore  
from rest_framework.permissions import AllowAny, IsAuthenticated    # type: ignore  

from .serializer import *  # Adjusted to match a likely correct name  
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore  
from rest_framework.response import Response  # type: ignore # Fixed import  
from rest_framework import status  # type: ignore  

# Create your views here.  
class UserRegistrationAPIView(GenericAPIView):  
    permission_classes = (AllowAny,)  
    serializer_class = UserReistrationSerializer # Ensure this matches your actual serializer class name  

    def post(self, request, *args, **kwargs):  
        serializer = self.get_serializer(data=request.data)  
        serializer.is_valid(raise_exception=True)  
        user = serializer.save()  
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh":str(token),
            "access":str(token.access_token)}
         
        
        return Response(data, status=status.HTTP_201_CREATED)
class UserLoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class =  UserLoginSerializer
    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
              
                "refresh": str(token),  # Use the correct variable here  
                "access": str(token.access_token)  # Access token from refresh token  
            
        }

        return Response(data,status=status.HTTP_200_OK)
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,*args,**kwargs):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserInfoAPView(RetrieveAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = CustomUserSerializer
     def get_object(self):
         return self.request.user
     



