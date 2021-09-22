from rest_framework.throttling import UserRateThrottle
from django.conf import settings


class GetRateThrottle(UserRateThrottle):
    rate = '1000/minute'

    def allow_request(self, request, view):
        if request.method == 'POST':
            return True
        else:
            return super().allow_request(request, view)


class PostRateThrottle(UserRateThrottle):
    rate = '30/minute'

    def allow_request(self, request, view):
        if request.method == 'GET':
            return True
        else:
            settings.STACK_SEARCH_THROTTLE_STATUS = super(PostRateThrottle, self).allow_request(request, view)
            return True
