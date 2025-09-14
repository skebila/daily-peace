import { DynamoDBClient, BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ca-central-1'
});

const TABLE_NAME = 'DailyPeaceEntries';

async function seedDailyPeace() {
  const versesData = JSON.parse(readFileSync(join(__dirname, 'verses.json'), 'utf-8'));
  const batchSize = 25;
  
  for (let i = 0; i < versesData.length; i += batchSize) {
    const batch = versesData.slice(i, i + batchSize);
    const requestItems = {
      [TABLE_NAME]: batch.map(verse => ({
        PutRequest: {
          Item: {
            id: { S: verse.id },
            text: { S: verse.text },
            createdAt: { S: new Date().toISOString() },
            updatedAt: { S: new Date().toISOString() }
          }
        }
      }))
    };

    await dynamoClient.send(new BatchWriteItemCommand({ RequestItems: requestItems }));
    console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  console.log('🎉 All verses inserted!');
}

seedDailyPeace().catch(console.error);
