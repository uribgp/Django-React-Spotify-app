"""
views main file
"""
from django.http import HttpResponse

def main(request):
    """
    home page
    """
    return HttpResponse("hello")
    