# WaifuBot
Made in China version of Mudae bot's Waifu rolling. Assets have been omitted from this repository

## Implemented features
### Ecchi lookup
On random waifu rolls, there is a random chance for a R18 reaction to appear on the message. Clicking the reaction will 
trigger the bot to DM the user an Ecchi image of the character, queried from gelbooru

### Series only roll
As the waifu db is expected to grow very large, users will be able to roll characters from a specific series, narrowing the total roll possibilities to increase the chance of getting their desired character

## Planned features
### Waifu Leveling
As this bot will not have "exclusive waifus" (ie. Each waifu can only be claimed once), a waifu level system will be introduced.
Claiming a waifu more than once will increase her level. Level up your waifus like pokemon and show them off

### Currency based rolls
Another ceiling controlling the rolling dynamic are waifu tokens. These will be used to roll for special waifus and increase the user's max waifu cap. Feel free to suggest additional things that can be done with waifu tokens

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
  "extraTag": "",
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

It is highly recommended to use a text editor like notepad++ to do this.

1. The name of the file should follow this format: **[Gender of Characters]_[Name of Series].json**

eg: F_Legend of fatties.json (file for female characters from a show called legend of fatties)

eg2: M_Legend of fatties.json (file for male characters from a show called legend of fatties)

2. Images must be mirrored to imgur and must be **300 x 375**. This is for consistency and also mirroring prevents hot linking to some poor dude's site

3. If you're unsure if you're doing it right, put your json file into this validator: [https://jsonlint.com/] 

4. The extraTag field should be an abbrieviation of the series name in parentheses

eg: 
Black Desert Online = (BDO)
Half Life 3 = (HL3)
Counter Strike Global Offensive = (CSGO)


If you've made up your mind on helping DM me on discord with a series/group/w/e you want to do so I can tell you if someone else is already doing it.


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
