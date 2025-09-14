# Daily Peace Backend

A Node.js backend service for the Daily Peace application that manages Bible verses in AWS DynamoDB.

## 🏗️ Project Structure

```
/backend/
├── package.json          # Dependencies and scripts
├── seedDailyPeace.js     # Script to seed DynamoDB with verses
├── verses.json          # Sample Bible verse data
└── README.md            # This file
```

## 📋 Prerequisites

- Node.js 18+ 
- AWS CLI configured with appropriate credentials
- DynamoDB table `DailyPeaceEntries` created (see setup instructions below)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up DynamoDB Table

Before running the seeder, you need to create the DynamoDB table. You can do this via AWS Console or AWS CLI:

#### Option A: AWS Console
1. Go to DynamoDB in AWS Console
2. Create a new table named `DailyPeaceEntries`
3. Set the partition key as `id` (String)
4. Use On-Demand billing mode (recommended for Lambda deployment)

#### Option B: AWS CLI
```bash
aws dynamodb create-table \
    --table-name DailyPeaceEntries \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode ON_DEMAND \
    --region us-east-1
```

### 3. Configure AWS Credentials

Set up your AWS credentials using one of these methods:

#### Option A: AWS CLI
```bash
aws configure
```

#### Option B: Environment Variables
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
```

#### Option C: IAM Role (for EC2/Lambda deployment)
No additional configuration needed when running on AWS infrastructure.

### 4. Run the Seeder

```bash
npm run seed
```

Or run directly:
```bash
node seedDailyPeace.js
```

## 📊 Data Structure

### DynamoDB Table Schema

**Table Name:** `DailyPeaceEntries`

| Attribute | Type   | Description                    |
|-----------|--------|--------------------------------|
| id        | String | Primary key (date: YYYY-MM-DD) |
| text      | String | Bible verse text               |
| createdAt | String | ISO timestamp of creation      |
| updatedAt | String | ISO timestamp of last update   |

### Sample Data Format

The `verses.json` file contains an array of verse objects:

```json
[
  {
    "id": "2024-01-01",
    "text": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future. - Jeremiah 29:11"
  }
]
```

## 🔧 Configuration

### Environment Variables

| Variable     | Default     | Description                    |
|--------------|-------------|--------------------------------|
| AWS_REGION   | us-east-1   | AWS region for DynamoDB        |
| TABLE_NAME   | DailyPeaceEntries | DynamoDB table name        |

### Local Development with DynamoDB Local

For local development, you can use DynamoDB Local:

1. Install DynamoDB Local:
```bash
# Using Docker (recommended)
docker run -p 8000:8000 amazon/dynamodb-local

# Or download and run locally
# Download from: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
```

2. Uncomment the endpoint configuration in `seedDailyPeace.js`:
```javascript
const dynamoClient = new DynamoDBClient({
  region: 'us-local',
  endpoint: 'http://localhost:8000'
});
```

## 🚀 Lambda Deployment

This backend is designed to be easily deployable to AWS Lambda:

### Preparation for Lambda

1. **Zip the deployment package:**
```bash
npm install --production
zip -r daily-peace-backend.zip . -x "*.git*" "*.md" "*.json"
```

2. **Lambda Configuration:**
   - Runtime: Node.js 18.x or higher
   - Handler: `seedDailyPeace.seedDailyPeace` (or create a Lambda-specific handler)
   - Memory: 256 MB (adjust based on data size)
   - Timeout: 5 minutes (adjust based on data size)

3. **IAM Permissions:**
   - `dynamodb:BatchWriteItem`
   - `dynamodb:PutItem`
   - `dynamodb:DescribeTable`

### Lambda Handler Example

Create a Lambda-specific handler:

```javascript
// lambda-handler.js
import { seedDailyPeace } from './seedDailyPeace.js';

export const handler = async (event, context) => {
  try {
    await seedDailyPeace();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Daily Peace seeding completed successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
```

## 🔍 Troubleshooting

### Common Issues

1. **"Table not found" error:**
   - Ensure the DynamoDB table `DailyPeaceEntries` exists
   - Check your AWS region configuration
   - Verify AWS credentials have DynamoDB permissions

2. **"Access denied" error:**
   - Check AWS credentials configuration
   - Ensure IAM user/role has DynamoDB write permissions

3. **"Batch write unprocessed items" warning:**
   - This is normal for large datasets
   - The script will continue processing remaining items
   - Consider implementing retry logic for production use

4. **Local DynamoDB connection issues:**
   - Ensure DynamoDB Local is running on port 8000
   - Check firewall settings
   - Verify endpoint configuration

## 📝 Adding More Verses

To add more Bible verses:

1. Edit `verses.json` with your new entries
2. Ensure each entry has a unique `id` (date format: YYYY-MM-DD)
3. Run the seeder again:
```bash
npm run seed
```

**Note:** Running the seeder multiple times will overwrite existing entries with the same `id`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
