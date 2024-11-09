from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
# Create your views here.
from rest_framework.views import APIView
from rest_framework.views import Response
# from django.contrib.auth.hashers import check_password
from rest_framework.exceptions import AuthenticationFailed
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.authentication import JWTAuthentication
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

        token = jwt.encode(payload,'secret',algorithm='HS256').decode('utf-8')

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
    




class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user is None:
            return Response({'error': 'User with this email does not exist'}, status=404)
        
        # Generate token
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        
        # Return the reset token and uid in the response
        return Response({
            'message': 'Password reset token generated successfully.',
            'uid': uid,
            'token': token
        })
    




class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.data.get('password')
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password has been reset successfully.'})
            return Response({'error': 'Password is required'}, status=400)
        
        return Response({'error': 'Invalid token or user ID'}, status=400)




# class ChangePasswordView(APIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]
#     def post(self, request):
#         user = request.user

#         if user.is_anonymous:
#             return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        
#         # Old and new password from request
#         old_password = request.data.get('old_password')
#         new_password = request.data.get('new_password')

#         # Check if the old password is correct
#         if not user.check_password(old_password):
#             return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

#         # Ensure the new password is provided and different from the old password
#         if not new_password or old_password == new_password:
#             return Response({"error": "New password must be provided and different from the old password"},
#                             status=status.HTTP_400_BAD_REQUEST)

#         # Update the password
#         user.set_password(new_password)
#         user.save()

#         # Update session to keep the user logged in
#         update_session_auth_hash(request, user)

#         return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
    



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        # Check if the JWT token is in the cookies
        token = request.COOKIES.get('jwt')
        
        if not token:
            return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            # Decode the token and validate it manually
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired. Please log in again."}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token. Please log in again."}, status=status.HTTP_401_UNAUTHORIZED)

        # User object is now authenticated
        user = User.objects.filter(id=payload['id']).first()

        if user is None:
            return Response({"error": "User not found."}, status=status.HTTP_401_UNAUTHORIZED)

        # Now we can check and update the password
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        if not new_password or old_password == new_password:
            return Response({"error": "New password must be provided and different from the old password."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Update the password
        user.set_password(new_password)
        user.save()

        # Update the session to reflect the password change
        update_session_auth_hash(request, user)

        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)