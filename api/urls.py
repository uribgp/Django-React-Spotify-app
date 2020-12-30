from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    # as_view gives the view for it
    path("home", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view())
]
