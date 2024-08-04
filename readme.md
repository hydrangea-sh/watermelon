# Watermelon

Watermelon is a self-hosted Discord bot designed for personal and small friend servers. It focuses on enhancing your Discord experience by providing quality-of-life features and fun integrations.

## Features

### Implemented

- **Social Media Embed Enhancer**: Automatically converts social media links into embed-friendly formats, displaying post contents within the embed.
- **Pat User**: Dynamically generates a GIF of a hand patting the avatar of a mentioned user.
- **Ping**: Measures the latency of the bot's response time.
- **UwU**: Transforms your message into an uwu-ified version, adding cute faces, actions, stutters, and more.
- **User Info**: Get a detailed overview of a user's information, including their name, account creation date, server join date, permissions, bot status, and roles.

### TBD

- **Music Playback**: Plans to support music playback from popular services like YouTube, Apple Music, and Spotify.
- **More Features Coming**: Stay tuned for additional functionalities.

## Prerequisites

To get started with Watermelon, you should have a basic understanding of Git, command line interfaces (CLI), creating Discord tokens, and TypeScript. If you're new to any of these concepts, consider checking out the following resources:

- [Git and GitHub for Beginners](https://guides.github.com/activities/hello-world/)
- [What is Command Line Interface (CLI)?](https://www.w3schools.com/whatis/whatis_cli.asp)
- [How to Get a Discord Bot Token?](https://discordgsm.com/guide/how-to-get-a-discord-bot-token)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Setup

Follow these instructions to set up Watermelon in your environment:

1. **Clone the repository:**

    ```bash
   git clone https://github.com/hydrangea-sh/watermelon
   ```

2. **Navigate to the project directory:**

   ```bash
   cd watermelon
   ```

3. **Install dependencies with Bun:**

   ```bash
   bun install
   ```

4. **Create `.env.development` and `.env.production` files:**

   Make sure to replace `DEVELOPMENT-TOKEN-HERE` and `PRODUCTION-TOKEN-HERE` with your actual Discord bot tokens. These files should be in the root of the directory. Refer to [.env.schema](https://github.com/hydrangea-sh/sori/blob/main/.env.schema).

   Here's a quick script you can use to create the files.

   ```bash
   echo 'DISCORD_TOKEN="PRODUCTION-TOKEN-HERE"' > .env.production
   echo 'PORT="3000"' > .env.production

   echo 'DISCORD_TOKEN="DEVELOPMENT-TOKEN-HERE"' > .env.development
   echo 'PORT="3000"' > .env.development
   ```

## Usage

- **Start the bot in production mode:**

  ```bash
  bun run start
  ```

- **Start the bot in development mode (with live reloading):**

  ```bash
  bun run dev
  ```

- **Test your code changes:**

  ```bash
  bun run test
  ```

- **Lint and format your code changes:**

  ```bash
  bun run check
  ```
