from django.http import HttpResponse
from django.shortcuts import redirect

def home(request):
    # Option 1: Return a simple message
    return HttpResponse("Welcome to BrewBean API. Go to <a href='http://localhost:5173'>frontend</a>.")
    # Option 2: Redirect to frontend (uncomment if preferred)
    # return redirect('http://localhost:5173')