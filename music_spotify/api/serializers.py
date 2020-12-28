"""
serializes classes into json readable format
currently serializing: Room
"""
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'vote_to_skip', 'created_at')
