import { User } from 'discord.js';
import { ICharacter } from '../../../models/ICharacter';
import GlobalTools from '../../../tools/GlobalTools';
import { IServerClaims } from '../../../models/IServerClaims';
import { VndbVnData } from '../../../models/VndbVnData';
import { MALMangaData } from '../../../models/MALMangaData';

const createCharacterList = (
  characters: ICharacter[], serverClaims: IServerClaims[],
) => {
  const contents = characters.map((character: ICharacter) => {
    const { id, name } = character;
    const isClaimed = serverClaims.find((claims) => claims.characterId === id);

    return `• ${name} ${isClaimed ? '💞' : ''} `;
  });

  return contents;
};

const generateSeriesInfoEmbed = (
  {
    author, characterList, series, claimedAmount, amountClaimable,
  }:
        {author: User, characterList: string, series: string, claimedAmount: number, amountClaimable: number},
) => {
  const { username, avatarURL } = author;

  const embed = GlobalTools.createEmbed(
    {
      title: `Characters in ${series} ${claimedAmount} / ${amountClaimable}`,
      contents: `${characterList}`,
      footer: `Requested by: ${username}`,
      footerImage: avatarURL,
    },
  );

  return embed;
};

const generateVnSeriesInfoEmbed = (
  { author, characterList, vnInformation }:
        {author: User, characterList:string, vnInformation: VndbVnData},
) => {
  const { username, avatarURL } = author;
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

const generateMangaSeriesInfoEmbed = (
  { author, characterList, mangaInfo }:
        {author: User, characterList:string, mangaInfo: MALMangaData},
) => {
  const { username, avatarURL } = author;
  const {
    image_url, title: series, synopsis, score, url,
  } = mangaInfo;

  const embed = GlobalTools.createEmbed(
    {
      title: `Characters in ${series}`,
      contents: `**Series Information**\n${synopsis}(${url})\n\n\n${characterList}`,
      footer: `Requested by: ${username} | Data from MAL`,
      author: `Rating: ${score}`,
      footerImage: avatarURL,
      image: image_url,
    },
  );

  return embed;
};

export default {
  generateSeriesInfoEmbed,
  generateVnSeriesInfoEmbed,
  generateMangaSeriesInfoEmbed,
  createCharacterList,
};
