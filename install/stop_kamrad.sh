#!/bin/bash

echo "Finding running Docker containers for КАМРАД..."

containers=$(docker ps --filter "name=^kamrad_" --format "{{.Names}}")

if [ -z "$containers" ]; then
    echo "No running containers found for КАМРАД."
    exit 0
fi

echo "Found the following running containers:"
echo "$containers"
echo ""

for container in $containers; do
    echo "Gracefully stopping container: $container"
    if docker stop "$container"; then
        echo "✓ Successfully stopped $container"
    else
        echo "✗ Failed to stop $container"
    fi
    echo ""
done

echo "Finished initiating graceful shutdown of all КАМРАД containers."
