from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer
import json
from genai_manager.genai_manager import GenAIManager


class DocumentView(APIView):
    def get(self, request, *args, **kwargs):
        result = Document.objects.all()
        serializers = DocumentSerializer(result, many=True)
        return Response(
            {'status' : 'success', "documents" : serializers.data},
            status=200
        )
    
    def post(self, request):
        data = json.loads(request.body)
        serializer = DocumentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"documents" : serializer.data}, status=200)
        
        return Response({"status" : "error"}, status=400)

@api_view(["DELETE"])    
def delete(request, pk):
    row = Document.objects.get(pk=pk)
    try:
        row.delete()
        return Response({"status" : "success"}, status=200)
    except:
        return Response({"status" : "Error"}, status=400)

def genai_action(data):
    body = data["body"]
    type = data["article_type"]
    formality = data["formality"]
    manager = GenAIManager(body, type, formality)
    return manager.chain_prompt_call()
    
@api_view(["GET"])
def get_ai(request, pk):
    result = Document.objects.get(pk=pk)
    if pk:
        serializers = DocumentSerializer(result)
        res = genai_action(serializers.data)
        return Response({"AIResponse" : res.strip()},status=200)
    
    return Response({"status" : "error"}, status=400)

@api_view(["POST"])
def post_ai(request):
    data = json.loads(request.body)
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        res = genai_action(data=data)
        return Response({"AIResponse" : res.strip()}, status=200)
        
    return Response({"status" : "error"}, status=400)