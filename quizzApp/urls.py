from django.urls import path 
from .views import registerView ,LoginView ,UserView ,LogoutView


urlpatterns = [
    path('register', registerView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
]