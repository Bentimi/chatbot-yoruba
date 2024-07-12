from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .bot import chatbot
import json

# Create your views here.

def response(request):
    if request.method == 'POST':
        inpp = request.POST.get('message', '')
        response = chatbot.respond(inpp)
        return JsonResponse({"response": response})
    return JsonResponse({"response": 'invalid request'}, status=400)

@csrf_exempt
def chatbot_response(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_input = data.get('message')
            response = chatbot.respond(user_input)
            return JsonResponse({"response": response})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    return render(request, 'project/chatbot.html')