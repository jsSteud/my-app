import React, { useEffect, useState } from 'react';
import { DynamoDB } from 'aws-sdk';
import { config } from 'aws-sdk';
import { getCurrentUser } from 'aws-amplify/auth';


interface Item {
    field: string;
    value: string;
}

interface User {
    userId: string;
    username: string;
}

const Data: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {

        const fetchUser = async () => {
            try {
              const currentUser: User | null = await getCurrentUser();
              
              if (currentUser) {
                setUser(currentUser);
              }
            } catch (error) {
                console.error('Error fetching user:', error);
                }
          };

        config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
            region: process.env.NEXT_PUBLIC_REGION,
        });


        fetchUser();
        
    }, []);

    useEffect(() => {
         
        const fetchItems = async () => {
            try {
                const dynamoDB = new DynamoDB.DocumentClient();
                const params = {
                    TableName: user?.userId || '',
                };
                const response = await dynamoDB.scan(params).promise();
                const fetchedItems = response.Items as Item[];
                setItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [user]);

    return (
        <div>
            <h1>Items List</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.field}>
                        {item.field}: {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Data;