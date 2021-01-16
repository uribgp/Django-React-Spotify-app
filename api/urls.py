from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom

urlpatterns = [
    # as_view gives the view for it
    path("home", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path("join-room", JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view())
]
