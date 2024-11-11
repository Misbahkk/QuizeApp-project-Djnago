from django.urls import path 
from .views import registerView ,LoginView ,UserView ,LogoutView,PasswordResetRequestView,PasswordResetConfirmView,ChangePasswordView


urlpatterns = [
    path('register', registerView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('request-reset-password', PasswordResetRequestView.as_view()),
    path('reset-password/', PasswordResetConfirmView.as_view()),
    path('change-password', ChangePasswordView.as_view()),
]