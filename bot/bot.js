import { Client, AttachmentBuilder, GatewayIntentBits } from 'discord.js';
import 'dotenv/config'
import fetch from 'node-fetch';
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages], // Updated intents to handle slash commands and messages
});

client.once('ready', async (c) => {
  console.log('🤖 ' + c.user.tag + ' is online!✅')

  // Register the slash command (this is a simple example, adjust as needed)
  const commands = await c.guilds.cache.get(process.env.SERVER_ID)?.commands.set([{
      name: 'search',
      description: 'Search for an image!',
      type: 1,
      options: [{
          name: 'query',
          type: 3,
          description: 'The search query to look for.',
          required: true,
      }],
  }]);
  console.log('Slash command registered!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'search') {
      const query = interaction.options.getString('query');
      
      // Here you can perform the search functionality using the 'query'.
      // For now, we're just sending a placeholder message.
      
      await interaction.reply(`You searched for: ${query}`);
  }
});

client.login(process.env.DISCORD_TOKEN);