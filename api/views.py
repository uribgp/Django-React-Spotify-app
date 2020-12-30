from django.shortcuts import render
from rest_framework import generics, status # status = http status codes from Response
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# class RoomView(generics.CreateAPIView): post 

# List = get
class RoomView(generics.ListAPIView):
    # all different rooms
    queryset = Room.objects.all()
    # runs them all through serializer to put them into json format
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            # grabs host from session
            host = self.request.session.session_key
            # checks if host already has a room
            queryset = Room.objects.filter(host=host)
            # if host has a room, it updates
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # if host doesn't have a room, a new one is created
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
