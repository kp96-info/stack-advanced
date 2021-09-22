from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.hashers import make_password


class SignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'email')

    def clean_password(self):
        password = self.cleaned_data.get('password', None)
        return make_password(password)


class LoginForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password')


class DateInput(forms.DateInput):
    input_type = 'date'


class StackSearchForm(forms.Form):
    page = forms.IntegerField()
    pagesize = forms.IntegerField()
    fromdate = forms.DateInput()
    todate = forms.DateInput()

    ORDER_CHOICES = [
        ('desc', 'desc'),
        ('asc', 'asc'),
    ]
    order = forms.ChoiceField(choices=ORDER_CHOICES)
    min = forms.SelectDateWidget()
    max = forms.DateInput(attrs={'type': 'date'})
    SORT_CHOICES = [
        ('activity', 'activity'),
        ('votes', 'votes'),
        ('creation', 'creation'),
        ('relevance', 'relevance')
    ]
    sort = forms.ChoiceField(choices=SORT_CHOICES)
    q = forms.CharField()
    TRUE_FALSE_CHOICES = [
        ('', ''),
        (True, True),
        (False, False)
    ]
    accepted = forms.ChoiceField(choices=TRUE_FALSE_CHOICES)
    answers = forms.IntegerField()
    body = forms.CharField()
    closed = forms.ChoiceField(choices=TRUE_FALSE_CHOICES)
    migrated = forms.ChoiceField(choices=TRUE_FALSE_CHOICES)
    notice = forms.ChoiceField(choices=TRUE_FALSE_CHOICES)
    nottagged = forms.CharField()
    tagged = forms.CharField()
    title = forms.CharField()
    user = forms.IntegerField()
    url = forms.CharField()
    views = forms.IntegerField()
    wiki = forms.ChoiceField(choices=TRUE_FALSE_CHOICES)

