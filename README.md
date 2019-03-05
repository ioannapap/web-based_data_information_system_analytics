# Murders analytics

## Database backups
Create a schema backup
```bash
mysqldump -u root -p --no-data dbname > schema.sql
```

Create a full backup
```bash
mysqldump -u root -p dbname > schema.sql
```

Run mysql script
```bash
mysql -u username -p database_name < file.sql
```

## Run database server
```bash
VBoxManage startvm 'Dedicated MySQL @ Ubuntu 18.04' --type headless
```
