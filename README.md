# BEST-Hacks-2020
Repository created for the first edition of BEST Hacks hackaton

## Deployment

### venv
```bash
python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

### database
```bash
docker run \
  --name hak-mysql-container \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=hak \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  -d mariadb:10.3
```

### alembic
```bash
alembic upgrade head
```

### run
```
source ./venv/bin/activate
python manage.py run
```