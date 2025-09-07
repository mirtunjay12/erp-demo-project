#!/bin/bash

# Exit on first error
set -e

echo "=============================="
echo "Running DB Migrations"
echo "=============================="

# Run migrations
npx db-migrate --config database.js up

# echo "=============================="
# echo "Running DB Seeds"
# echo "=============================="

# # Run seeds
# npx db-migrate seed up

echo "=============================="
echo "Database setup completed!"
echo "=============================="
