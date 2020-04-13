const STORIES_FOLDER = '../public/data/stories';
const storiesList = require(STORIES_FOLDER + '/stories.json');

const REMOTE_PATH_STUB = 'https://kswd-hfls-stories.s3-us-west-1.amazonaws.com';


console.log(storiesList);

const getStories = () => {
  const finalStoriesData = {};

  const storiesEntries = Object.entries(storiesList);
  console.log('storiesEntries', storiesEntries);
  for (const [level, storiesData] of storiesEntries) {
    console.log('level', storiesData)
    const storyDataForLevel = storiesData.map(story => {
      const storyData = require(`${STORIES_FOLDER}/beginner/${story}.json`);
      console.log('storyData', storyData);
      storyData.audioPath = `${REMOTE_PATH_STUB}/${level}/${story}.mp3`;
      storyData.thumbnailPath = `${REMOTE_PATH_STUB}/${level}/${story}_tn.png`;
      storyData.paragraphs.forEach((p, idx) =>
        storyData.paragraphs[idx].header.imagePath = `${REMOTE_PATH_STUB}/${level}/${story}.png`,
      );
      return storyData;
    });
    finalStoriesData[level] = storyDataForLevel;
  }
  return finalStoriesData;
};

module.exports = getStories;