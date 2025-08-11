// MongoDB initialization script
db = db.getSiblingDB('game_db');

// Create collections
db.createCollection('status_checks');

// Create indexes for better performance
db.status_checks.createIndex({ "timestamp": -1 });
db.status_checks.createIndex({ "client_name": 1 });

// Insert some sample data if needed
db.status_checks.insertOne({
    id: "sample-id-1",
    client_name: "sample-client",
    timestamp: new Date()
});

print("MongoDB initialized successfully!");