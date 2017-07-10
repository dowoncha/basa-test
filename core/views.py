import operator
from functools import reduce
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.db.models import Q

from django.views.generic import DetailView

from .models import Artist

def index(request):
  artists = Artist.objects.all()

  return render(request, 'core/artist_list.html', {'artists': artists})

def list_artists(request):
  """
  REST-API
  Return a list of artists
  Query includes offset, limit for pagination
  search value
  """
  # Get the search string and split to terms by whitespace
  search_string = request.GET.get('search', None)
  search_terms = search_string.split(' ')

  # Get all artists
  artists_query = Artist.objects.all()

  # Create search query by matching terms to both name and tags
  q = Q(name__icontains=search_terms[0]) | Q(tags__name__icontains=search_terms[0])
  for term in search_terms[1:]:
    q.add((Q(name__icontains=term) | Q(tags__name__icontains=term)), q.connector)

  # Filter artists
  artists_model = artists_query.filter(q).distinct()

  # Get query page number or default to 1
  page = request.GET.get('page', 1)

  # Paginate by 10 artists per page
  paginator = Paginator(artists_model, 10)

  # try:
  #   artists = paginator.page(page)
  # except PageNotAnInteger:
  #   artists = paginator.page(1)
  # except EmptyPage:
  #   artists = paginator.page(paginator.num_pages)

  serialized_artists = serializers.serialize('json', artists_model, use_natural_foreign_keys=True)

  return JsonResponse({
    'totalItems': paginator.count,
    'totalPages': paginator.num_pages,
    # 'currentPage': page,
    'artists': serialized_artists
  })

class ArtistDetail(DetailView):
  model = Artist
  queryset = Artist.objects.all()

  # def get_object(self):
  #  object = super(ArtistDetail, self).get_object()