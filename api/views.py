from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# class RoomView(generics.CreateAPIView): post 

# List = get
class RoomView(generics.ListAPIView):
    # all different rooms
    queryset = Room.objects.all()
    # runs them all through serializer to put them into json format
    serializer_class = RoomSerializer
