import requests


def call_stackoverflow_advance(query_param:dict):
    url = 'https://api.stackexchange.com/2.3/search/advanced?site=stackoverflow'
    response = requests.get(url, params=query_param)
    return response
