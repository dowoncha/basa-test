from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render

from .models import Artist

def index(request):
  return render(request, 'index.html')

def list_artists(request):
  """
  Return a list of artists
  Query includes offset, limit for pagination
  search value
  """

  artists_model = Artist.objects.all()

  artists = serializers.serialize('json', artists_model)

  return JsonResponse({
    'artists': artists
  })