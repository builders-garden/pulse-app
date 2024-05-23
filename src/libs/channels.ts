import {MostFollowedChannel} from '../api/channel/types';

export function TransformMostFollowedChannels(channels: MostFollowedChannel[]) {
  return channels.reduce(
    (acc, curr, index, array) => {
      if (index % 3 === 0) {
        const obj: {
          item1: MostFollowedChannel;
          item2?: MostFollowedChannel;
          item3?: MostFollowedChannel;
        } = {item1: curr};
        if (index + 1 < array.length) {
          obj.item2 = array[index + 1];
        }
        if (index + 2 < array.length) {
          obj.item3 = array[index + 2];
        }
        acc.push(obj);
      }
      return acc;
    },
    [] as Array<{
      item1: MostFollowedChannel;
      item2?: MostFollowedChannel;
      item3?: MostFollowedChannel;
    }>,
  );
}
