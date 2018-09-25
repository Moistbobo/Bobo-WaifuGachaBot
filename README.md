# WaifuBot
Made in China version of Mudae bot's Waifu rolling. Assets have been omitted from this repository

## How to help
I need people to help build the waifu database for this bot.
The bot is very flexible in the way that it is setup, such that it isn't only limited to waifu/husbandos from anime.

But each additional character requires actual man labor to insert into the bot friendly format.

Data is fed into the bot through .json files. If you don't know what a .json file is, don't worry about it.

The following is the skeleton for these files:

```JSON
{
  "type": "",
  "description": "",
  "url": "",
  "img": "",
  "characters": [
    {
      "name": "",
      "img": [
		""
      ]
    },
    {
      "name": "",
      "img": [
      ]
    },
    {
      "name": "",
      "img": [
      ]
    }
  ]
}
```

All you'd have to do is fill it out like so...
Keep in mind the following considerations:

1. The name of the file should follow this format: **[Gender of Characters]_[Name of Series].json**

eg: F_Legend of fatties.json (file for female characters from a show called legend of fatties)

eg2: M_Legend of fatties.json (file for male characters from a show called legend of fatties)

2. Images must be mirrored to imgur and must be **300 x 375**. This is for consistency and also mirroring prevents hot linking to some poor dude's site

3. If you're unsure if you're doing it right, put your json file into this validator: [https://jsonlint.com/] 

```JSON
{
  "type": "Anime",
  "description": "This is an anime about big titties",
  "url": "www.website.com",
  "img": "IMGUR LINK",
  "characters": [
    {
      "name": "Bob",
      "img": [
		"imgur link 1",
    "imgur link 2"
      ]
    },
    {
      "name": "Bob's friend",
      "img": [
    "imgur link 1"
    ]
    },
    {
      "name": "Bob's friend that dies at the end",
      "img": [
      "imgur link 1"
      ]
    }
  ]
}
```



DM me completed json files on discord at manbo#0003
