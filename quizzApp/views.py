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
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


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
    

# class LoginView(TokenObtainPairView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         # Optional: Set access token in the cookie
#        
#         response.set_cookie(
#             key='access',
#             value=response.data['access'],
#             httponly=True,
#             samesite='Lax'
#         )
#         response.set_cookie(
#             key='refresh',
#             value=response.data['refresh'],
#             httponly=True,
#             samesite='Lax'
#         )
#         return response


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

        # Generate and save OTP
        user.set_otp()
        OTP= user.otp_code

        # Send OTP via email
        send_mail(
            'Your Password Reset OTP',
            f'Your OTP code is: {OTP}',
            'your_email@example.com',
            [user.email],
            fail_silently=False,
        )
        print("Ypur otp cde: ",OTP)

        return Response({'message': 'OTP sent to your email.'})

class PasswordResetConfirmView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        new_password = request.data.get('password')

        user = User.objects.filter(email=email, otp_code=otp_code).first()

        # Check if the user exists and OTP is valid
        if user is None or user.otp_expiry < timezone.now():
            return Response({'error': 'Invalid or expired OTP code.'}, status=400)

        # Set the new password
        if new_password:
            user.set_password(new_password)
            # Clear OTP fields after successful reset
            user.otp_code = None
            user.otp_expiry = None
            user.save()
            return Response({'message': 'Password has been reset successfully.'})

        return Response({'error': 'Password is required'}, status=400)












# class PasswordResetRequestView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         user = User.objects.filter(email=email).first()
        
#         if user is None:
#             return Response({'error': 'User with this email does not exist'}, status=404)
        
#         # Generate token
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = default_token_generator.make_token(user)
        
#         # Return the reset token and uid in the response
#         return Response({
#             'message': 'Password reset token generated successfully.',
#             'uid': uid,
#             'token': token
#         })
    


# class PasswordResetConfirmView(APIView):
#     def post(self, request, uidb64, token):
#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             user = None

#         if user is not None and default_token_generator.check_token(user, token):
#             new_password = request.data.get('password')
#             if new_password:
#                 user.set_password(new_password)
#                 user.save()
#                 return Response({'message': 'Password has been reset successfully.'})
#             return Response({'error': 'Password is required'}, status=400)
        
#         return Response({'error': 'Invalid token or user ID'}, status=400)




class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        # Extract JWT from the Authorization header
        token = request.COOKIES.get('jwt')  # Assuming token is stored in cookies

        if not token:
            return Response({"error": "Authentication credentials were not provided."}, status=401)

        try:
            # Decode the token and validate it manually
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired. Please log in again."}, status=401)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token. Please log in again."}, status=401)

        # Now that the token is valid, get the user from the payload
        user = User.objects.filter(id=payload['id']).first()
        
        if user is None:
            return Response({"error": "User not found."}, status=401)

        # Now, process password change
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect."}, status=400)

        if old_password == new_password:
            return Response({"error": "New password must be different from the old password."}, status=400)

        # Update the password
        user.set_password(new_password)
        user.save()

        # Optionally, you may want to update the session after password change
        update_session_auth_hash(request, user)

        return Response({"message": "Password updated successfully."}, status=200)
    



# class ChangePasswordView(APIView):
#     permission_classes = [IsAuthenticated]  # Only allows authenticated users
#     authentication_classes = [JWTAuthentication]  # Uses JWT authentication

#     def post(self, request):
#         user = request.user  # Get the currently authenticated user directly

#         # Extract the old and new passwords from the request data
#         old_password = request.data.get('old_password')
#         new_password = request.data.get('new_password')

#         # Check if the old password is correct
#         if not user.check_password(old_password):
#             return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

#         # Validate that the new password is different from the old password
#         if not new_password or old_password == new_password:
#             return Response({"error": "New password must be provided and different from the old password."},
#                             status=status.HTTP_400_BAD_REQUEST)

#         # Update the password
#         user.set_password(new_password)
#         user.save()

#         # Update session authentication hash to keep the user logged in
#         update_session_auth_hash(request, user)

#         return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)