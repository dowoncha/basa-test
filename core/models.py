from django.db import models

class Location(models.Model):
  city = models.CharField(max_length=200)
  country = models.CharField(max_length=200)

  def natural_key(self):
    return (self.city, self.country)

  def __str__(self):
    return self.city + ',' + self.country

  class Meta:
    unique_together = (('city', 'country'), )

class Tag(models.Model):
  name = models.CharField(max_length=50, primary_key=True)

  def __str__(self):
    return self.name

class Artist(models.Model):
  name = models.CharField(max_length=200)
  description = models.TextField()
  location = models.ForeignKey(Location)
  tags = models.ManyToManyField(Tag)

  def __str__(self):
    return self.name