// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photos-view.html

// Load the required clients and packages
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
const awsConfig = require("../../config/config.js");
const path = require("path");

// Initialize the Amazon Cognito credentials provider
const REGION = awsConfig.region;
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: awsConfig.identityPoolId, // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  }),
});

// A utility function to create HTML.
function getHtml(template) {
  return template.join("\n");
}
// Make the getHTML function available to the browser
// window.getHTML = getHtml;

// List the photo albums that exist in the bucket
const albumBucketName = awsConfig.bucketName;

const listAlbums = async () => {
  try {
    const data = await s3.send(
      new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
    );
    const albums = data.CommonPrefixes.map(function (commonPrefix) {
      const prefix = commonPrefix.Prefix;
      const albumName = decodeURIComponent(prefix.replace("/", ""));
      return getHtml([
        "<li>",
        '<button style="margin:5px;" onclick="viewAlbum(\'' +
          albumName +
          "')\">",
        albumName,
        "</button>",
        "</li>",
      ]);
    });
    const message = albums.length
      ? getHtml(["<p>Click a folder name to view it.</p>"])
      : "<p>You don't have any folders. You need to create a folder.";
    const htmlTemplate = [
      "<h2>Folders</h2>",
      message,
      "<ul>",
      getHtml(albums),
      "</ul>",
    ];
    document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
  } catch (err) {
    return alert("1 There was an error listing your albums: " + err.message);
  }
};
// Make the viewAlbum function available to the browser
// window.listAlbums = listAlbums;

// Show the photos that exist in an album
const viewAlbum = async (albumName) => {
  try {
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const data = await s3.send(
      new ListObjectsCommand({
        Prefix: albumPhotosKey,
        Bucket: albumBucketName,
      })
    );
    const href = "https://s3." + REGION + ".amazonaws.com/";
    const bucketUrl = href + albumBucketName + "/";
    const photos = data.Contents.map(function (photo) {
      const photoKey = photo.Key;
      const photoUrl = bucketUrl + encodeURIComponent(photoKey);
      if (!photoUrl.match("_mask.png")) {
        const maskImage = `${path.parse(photoUrl).dir}/${
          path.parse(photoUrl).name
        }_mask.png`;
        // debugger
        // alert(`photoUrl: ${photoUrl}`)
        // alert(`maskImage: ${maskImage}`)
        return getHtml([
          "<span>",
          '<div style="padding:5px;">',
          "<br/>",
          // '<img style="max-width:200px;max-height:200px;" src="' + photoUrl + '"/>',
          '<remove-background image-data="' +
            photoUrl +
            '" mask-data="' +
            maskImage +
            '"></remove-background>',
          "</div>",
          "<div>",
          "<span>",
          photoKey.replace(albumPhotosKey, ""),
          "</span>",
          "</div>",
          "</span>",
        ]);
      }
    });
    const message = photos.length
      ? "<p>The following photos are present.</p>"
      : "<p>There are no photos in this album.</p>";
    const htmlTemplate = [
      "<div>",
      '<button onclick="listAlbums()">',
      "Back To Directories",
      "</button>",
      "</div>",
      "<h2>",
      "Folder: " + albumName,
      "</h2>",
      message,
      '<div style="display:flex;width:100%;">',
      getHtml(photos),
      "</div>",
      "<h2>",
      "End of Folder: " + albumName,
      "</h2>",
      "<div>",
      '<button onclick="listAlbums()">',
      "Back To Directories",
      "</button>",
      "</div>",
    ];
    document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
    document
      .getElementsByTagName("img")[0]
      .setAttribute("style", "display:none;");
  } catch (err) {
    return alert("2 There was an error viewing your album: " + err.message);
  }
};

// Make the viewAlbum function available to the browser
// window.viewAlbum = viewAlbum;

module.exports = {
  listAlbums
}
