import { Sequelize } from 'sequelize';
import db from '../path/to/your/models/index'; 

describe('Queue Model Tests', () => {
    test('Create and retrieve a queue', async () => {
        const newQueue = await db.QueueModel.create({
            currentQueueSize: 0,
            averageServiceTime: 30,
            queueStartTime: "2024-04-05 09:48:37",
            queueEndTime: "2024-04-05 10:48:37",
            queueStatus: 'active',

        });

        const foundQueue = await db.QueueModel.findByPk(newQueue.queueID);
        expect(foundQueue.currentQueueSize).toEqual(0);
        expect(foundQueue.queueStatus).toEqual('active');
    });

    test('Update a queue', async () => {
        const queue = await db.QueueModel.create({
            currentQueueSize: 0,
            queueStatus: 'active'
        });

        await db.QueueModel.update({ currentQueueSize: 1 }, { where: { queueID: queue.queueID } });
        const updatedQueue = await db.QueueModel.findByPk(queue.queueID);
        expect(updatedQueue.currentQueueSize).toEqual(1);
    });
});
