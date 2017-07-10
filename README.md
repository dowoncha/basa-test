# Setup
Create a virtualenv and install dependencies
```
virtualenv venv -p python3
source venv/bin/activate
pip install -r requirements.txt
```

Run migrations and create a superuser to login to admin
```
python manage.py migrate
python manage.py createsuperuser
```

# Run
Run the python local server and navigate to localhost:8000
```
python manage.py runserver
```