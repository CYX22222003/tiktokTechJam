from django.db import models

# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=300)
    article_type = models.IntegerField()
    formality = models.IntegerField()
    body = models.CharField(max_length=100000)
