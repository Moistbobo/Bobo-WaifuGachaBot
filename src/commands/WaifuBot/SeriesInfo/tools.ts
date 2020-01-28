import { User } from 'discord.js';
import { ICharacter } from '../../../models/ICharacter';
import GlobalTools from '../../../tools/GlobalTools';
import { IServerClaims } from '../../../models/IServerClaims';
import { VndbVnData } from '../../../models/VndbVnData';

const createCharacterList = (
  characters: ICharacter[], serverClaims: IServerClaims[],
) => {
  const contents = characters.map((character: ICharacter) => {
    const { id, name } = character;
    const isClaimed = serverClaims.find((claims) => claims.characterId === id);

    return `• ${name} ${isClaimed ? '💞' : ''} `;
  });

  return contents.join('\n');
};

const generateSeriesInfoEmbed = (
  { user, characterList, series }:
        {user: User, characterList: string, series: string },
) => {
  const { username, avatarURL } = user;

  const embed = GlobalTools.createEmbed(
    {
      title: `Characters in ${series}`,
      contents: `${characterList}`,
      footer: `Requested by: ${username}`,
      footerImage: avatarURL,
    },
  );

  return embed;
};

const generateVnSeriesInfoEmbed = (
  { user, characterList, vnInformation }:
        {user: User, characterList:string, vnInformation: VndbVnData},
) => {
  const { username, avatarURL } = user;
  const {
    image, title: series, description, rating, popularity, id,
  } = vnInformation;

  const embed = GlobalTools.createEmbed(
    {
      title: `Characters in ${series}`,
      contents: `**Series Information**\n${description}(https://vndb.org/v${id})\n\n\n${characterList}`,
      footer: `Requested by: ${username} | Data from vndb`,
      author: `Rating: ${rating} | Popularity: ${popularity}`,
      footerImage: avatarURL,
      image,
    },
  );

  return embed;
};

export default {
  generateSeriesInfoEmbed,
  generateVnSeriesInfoEmbed,
  createCharacterList,
};
