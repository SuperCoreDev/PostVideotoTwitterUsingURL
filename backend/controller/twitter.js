const { twitterClient } = require("./../const/twitterclient");
const Twitter = require('twitter-api-v2')
const https = require('https');

const getTwitterMediaFromURL = async (url) => {
  const buffer = await getBufferFromURL(url);
  if (!buffer) {
      return;
  }

  // console.log('buffer ', buffer.toString('base64'));

  try {
      return await twitterClient.v1.uploadMedia(buffer, {mimeType: getMimeTypeFromURL(url)});
  } catch (error) {
      console.error('Could not upload media. ', error);
      return null;
  }
  
  // return await twitterClient.v1.uploadMedia(buffer, {mimeType: getMediaTypeFromURL(url)});
};


const getBufferFromURL = async (url) => {
  return await new Promise((resolve, reject) => {
      https.get(url, response => {
          const data = [];
          response.on('data', chunk => {
              data.push(chunk);
          });
          response.on('end', () => {
              resolve(Buffer.concat(data));
          });
      }).on('error', error => {
          console.error('Could not retrieve media data. ', url, error);
          reject();
      });
  });
};

const getMimeTypeFromURL = (url) => {
  url = url.toLowerCase();

  // Jpeg
  // Mp4
  // Gif
  // Png
  // Srt
  // Webp

  if (url.endsWith('mp4')) {
      return Twitter.EUploadMimeType.Mp4;
  } else if (url.endsWith('png')) {
      return Twitter.EUploadMimeType.Png;
  } else if (url.endsWith('jpg')) {
      return Twitter.EUploadMimeType.Jpeg;
  } else if (url.endsWith('jpeg')) {
      return Twitter.EUploadMimeType.Jpeg;
  } else if (url.endsWith('gif')) {
      return Twitter.EUploadMimeType.Gif;
  }

  return null;
};
const postTwitte = async(req, res) => {
  try {
    var url = req.body.url;
    console.log(url)
    const twitterVideo = await getTwitterMediaFromURL('https://pizzap.io/video/pizzap.aigc.s1.mp4');
    // res.status(200).send({data:result.data})
    const tweet = await twitterClient.v2.tweet(url, {
      media: {
          media_ids: [twitterVideo],
      },
    })
    const me = await twitterClient.v2.me();
    if(tweet.data.id && me.data.id){
      const newLink = 'https://twitter.com/@' + me.data.username + '/status/' + tweet.data.id
      res.status(200).send({data: newLink})
    }
    
    try {
      console.log('Posted tweet.\n' + 'https://twitter.com/@' + me.data.username + '/status/' + tweet.data.id);
    } catch (error) {
        const detail = error?.data?.detail || error;
        console.log('Failed to post tweet link.\n' + detail);
        console.error('Failed to post tweet link. ', detail);
    }
  } catch (error) {
      if (error.code === 400) {
        const detail = error?.data?.detail || error;
        console.log('Failed to post tweet.\n' + detail + '\nhttps://help.twitter.com/en/using-twitter/twitter-videos');
        console.error('Failed to tweet videos. ', detail);
    } else {
        const detail = error?.data?.detail || error;
        console.log('Failed to post tweet.\n' + detail);
        console.error('Failed to tweet videos. ', detail);
    }
  }
}
module.exports.postTwitte = postTwitte
//https://twitter.com/@UIEg9fWlcPrvcMN/status/1747492220599717974