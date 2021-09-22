from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password')

    def create(self, validated_data):
        with transaction.atomic():
            user = User(
                username=validated_data.get('username'),
            )
            user.set_password(validated_data.get('password'))
            user.save()
        return user


class StackSearchSerializer(serializers.Serializer):
    page = serializers.IntegerField(required=False)
    pagesize = serializers.IntegerField(required=False)
    fromdate = serializers.DateField(required=False)
    todate = serializers.DateField(required=False)

    ORDER_CHOICES = [
        ('desc', 'desc'),
        ('asc', 'asc'),
    ]
    order = serializers.ChoiceField(choices=ORDER_CHOICES, required=False)
    min = serializers.DateField(required=False)
    max = serializers.DateField(required=False)
    SORT_CHOICES = [
        ('activity', 'activity'),
        ('votes', 'votes'),
        ('creation', 'creation'),
        ('relevance', 'relevance')
    ]
    sort = serializers.ChoiceField(choices=SORT_CHOICES, required=False)
    q = serializers.CharField(required=False)
    TRUE_FALSE_CHOICES = [
        (None, None),
        (True, True),
        (False, False)
    ]
    accepted = serializers.ChoiceField(choices=TRUE_FALSE_CHOICES, required=False)
    answers = serializers.IntegerField(required=False)
    body = serializers.CharField(required=False)
    closed = serializers.ChoiceField(choices=TRUE_FALSE_CHOICES, required=False)
    migrated = serializers.ChoiceField(choices=TRUE_FALSE_CHOICES, required=False)
    notice = serializers.ChoiceField(choices=TRUE_FALSE_CHOICES, required=False)
    nottagged = serializers.CharField(required=False)
    tagged = serializers.CharField(required=False)
    title = serializers.CharField(required=False)
    user = serializers.IntegerField(required=False)
    url = serializers.CharField(required=False)
    views = serializers.IntegerField(required=False)
    wiki = serializers.ChoiceField(choices=TRUE_FALSE_CHOICES, required=False)
