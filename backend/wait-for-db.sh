echo "Waiting for postgres..."

while ! nc -z db 5432; do
  sleep 0.5
done

echo "Postgres started"

exec "$@"
