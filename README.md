# BEST-Hacks-2020
Repository created for the first edition of BEST Hacks hackaton

## Deployment

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
