#!/bin/bash

# SSL Certificate Renewal Script
# This script automatically renews Let's Encrypt SSL certificates

# Set the working directory
cd /home/$USER/san-pickleball

# Log the renewal attempt
echo "$(date): Starting SSL certificate renewal check..."

# Attempt to renew certificates
docker compose run --rm certbot renew

# Check if renewal was successful and reload nginx if needed
if [ $? -eq 0 ]; then
    echo "$(date): Certificate renewal successful or not needed"
    
    # Reload nginx to use new certificates (if any were renewed)
    echo "$(date): Reloading nginx configuration..."
    docker compose exec nginx nginx -s reload
    
    if [ $? -eq 0 ]; then
        echo "$(date): Nginx reloaded successfully"
    else
        echo "$(date): Failed to reload nginx"
        # Restart nginx container if reload fails
        echo "$(date): Restarting nginx container..."
        docker compose restart nginx
    fi
else
    echo "$(date): Certificate renewal failed"
    # Send notification or alert here if needed
fi

# Clean up old certificates
docker compose run --rm certbot certificates

echo "$(date): SSL renewal check completed"
echo "----------------------------------------"