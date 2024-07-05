from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=300)
    article_type = serializers.IntegerField()
    formality = serializers.IntegerField()
    body = serializers.CharField(max_length=100000)

    class Meta:
        model = Document
        fields = ('__all__')