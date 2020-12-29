from django.urls import path
from .views import RoomView

urlpatterns = [
  # as_view gives the view for it
    path('home', RoomView.as_view())
]