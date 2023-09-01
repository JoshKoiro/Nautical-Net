import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import 'dotenv/config'
import fetch from 'node-fetch';
import { searchPexels } from './pexelsImgs.js'
import { searchUnsplash } from './unsplashImgs.js'
import { getFlags, getQuery } from './queryParse.js'
// import { clipboard } from 'electron';
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages], // Updated intents to handle slash commands and messages
});

client.once('ready', async (c) => {
  console.log('🤖 ' + c.user.tag + ' is online!✅')

  // Register the slash command (this is a simple example, adjust as needed)
  const commands = await c.guilds.cache.get(process.env.SERVER_ID)?.commands.set([{
      name: 'search-pexels',
      description: 'Search for an image!',
      type: 1,
      options: [{
          name: 'query',
          type: 3,
          description: 'The search query to look for.',
          required: true,
      }],
  },
  {
    name: 'search-unsplash',
    description: 'Search for an image!',
    type: 1,
    options: [{
        name: 'query',
        type: 3,
        description: 'The search query to look for.',
        required: true,
    }],
}
  // more slash commands to be added here
]
    

  );
  console.log('Search commands created');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'search-pexels') {
      const discordQuery = interaction.options.getString('query');
      const query = getQuery(discordQuery);
      const flags = getFlags(discordQuery);
      
      try {
        let randomNumber = Math.floor(Math.random() * 50) + 1;
        const results = await searchPexels(query,flags.imgQty,randomNumber);

        let embeds = [];

        // Limiting results to 10 to avoid hitting Discord's embed limit.
        for (let i = 0; i < Math.min(results.length, 10); i++) {
            let embed = new EmbedBuilder()
                  .setTitle(results[i].alt)
                  .setDescription(results[i].photographer)
                  .setImage(results[i].src)
                  .setURL(results[i].src)
                  // Should add a button here to copy the image link

            embeds.push(embed);
        }

        await interaction.reply({ embeds: embeds });

    } catch (error) {
        console.error("Error searching Pexels:", error);
        await interaction.reply({ content: "Sorry, there was an error processing your search. Please try again later.", ephemeral: true });
    }
  }

  if (commandName === 'search-unsplash') {
    const discordQuery = interaction.options.getString('query');
    const query = getQuery(discordQuery);
    const flags = getFlags(discordQuery);
    
    try {
      let numResults = 8;
      let randomNumber = Math.floor(Math.random() * 50) + 1;
      const results = await searchUnsplash(query,numResults,randomNumber);

      let embeds = [];

      // Limiting results to 10 to avoid hitting Discord's embed limit.
      for (let i = 0; i < Math.min(results.length, 10); i++) {
          let embed = new EmbedBuilder()
                .setTitle(results[i].alt)
                .setDescription(results[i].photographer)
                .setImage(results[i].src)
                .setURL(results[i].src)
                // Should add a button here to copy the image link

          embeds.push(embed);
      }

      await interaction.reply({ embeds: embeds });

  } catch (error) {
      console.error("Error searching Unsplash:", error);
      await interaction.reply({ content: "Sorry, there was an error processing your search. Please try again later.", ephemeral: true });
  }
}

});

client.login(process.env.DISCORD_TOKEN);