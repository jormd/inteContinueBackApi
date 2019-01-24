// Imports the Google Cloud client library

async function quickStart() {
    // Your Google Cloud Platform project ID
    const projectId = 'johann-romand-2018';


    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            description: 'Ranger la cuisine',
        },
    };

    // Saves the entity
    await datastore.save(task);
    console.log(`Saved ${task.key.name}: ${task.data.description}`);
}
quickStart().catch(console.error);
