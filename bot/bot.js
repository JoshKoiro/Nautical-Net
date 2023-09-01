import { Client, AttachmentBuilder, EmbedBuilder, GatewayIntentBits } from 'discord.js';
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
  console.log('Slash command registered!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'search') {
      const query = interaction.options.getString('query');
      
      // Here you can perform the search functionality using the 'query'.
      // For now, we're just sending a placeholder message.
      
      // await interaction.reply(`You searched for: ${query}`);
      const results = await searchPexels(query).then((res) => {
          return res;
      });

      let embeds = [];

      for (let i = 0; i < results.length; i++) {
          let embed = new EmbedBuilder()
                .setTitle(results[i].alt)
                // .setColor(0xffa500) // You can set it to any color you want
                .setDescription(results[i].photographer)
                .setImage(results[i].src)
          
          embeds.push(embed);
      }

            await interaction.reply({ embeds: embeds });
  }

});

client.login(process.env.DISCORD_TOKEN);