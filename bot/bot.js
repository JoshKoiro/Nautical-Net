import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import 'dotenv/config'
import fetch from 'node-fetch';
import { searchPexels } from './pexelsImgs.js'
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
  }]
    // more slash commands to be added here

  );
  console.log('Search command created');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'search') {
      const query = interaction.options.getString('query');
      
      try {
        let numResults = 8;
        let randomNumber = Math.floor(Math.random() * 1000) + 1;
        const results = await searchPexels(query,numResults,randomNumber);

        let embeds = [];

        // Limiting results to 10 to avoid hitting Discord's embed limit.
        for (let i = 0; i < Math.min(results.length, 10); i++) {
            let embed = new EmbedBuilder()
                  .setTitle(results[i].alt)
                  .setDescription(results[i].photographer)
                  .setThumbnail(results[i].src);
            
            embeds.push(embed);
        }

        await interaction.reply({ embeds: embeds });

    } catch (error) {
        console.error("Error searching Pexels:", error);
        await interaction.reply({ content: "Sorry, there was an error processing your search. Please try again later.", ephemeral: true });
    }
  }

});

client.login(process.env.DISCORD_TOKEN);