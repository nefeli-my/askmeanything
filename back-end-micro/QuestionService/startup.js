const {getLast, create} = require('./server/controllers/message')
const {create: createU} = require('./server/controllers/user')

module.exports = {
    async sync_messages(pool) {
        pool.hget('bus', 'messages', async (err, data) => {
            try {
                let currentMessages = JSON.parse(data);
                let last_message = await getLast()
                    .catch(err => console.log(err))
                if( !last_message) {
                    last_message = {id:-1};
                }
                for (let message of currentMessages) {
                    if (message.id > last_message.id) {
                        if (message.event.action === 'createUser') {
                            await createU(message.event.user);
                        }
                        await create(message.id)
                    }
                }
            }
            catch (err){
                console.log(err);
            }
        });
    }
}