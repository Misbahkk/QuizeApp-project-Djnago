from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


class registerView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    


class LoginView(APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User Not Found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')
        

        payload ={
            'id':user.id,
            'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret',algorithm='HS256')#.decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt',value =token,httponly=True)
        response.data={
            'jwt':token
        }
        
        return response
    

class UserView(APIView):
    def get(self,request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise  AuthenticationFailed('UnAuthenticated!!')
        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])

        except jwt.ExpiredSignatureError:

            raise AuthenticationFailed('UnAuthenticated!!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer= UserSerializer(user)


        return Response(serializer.data)
    


class LogoutView(APIView):
    def post(self,request):
        responce = Response()
        responce.delete_cookie('jwt')
        responce.data={
            'message':'success'
        }
        return responce